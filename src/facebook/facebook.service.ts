import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import { Browser, chromium, Page } from 'playwright';
import { SheetsService } from 'src/ggsheet/sheets.service';
import { updateCandidateStatus } from 'src/ggsheet/update';
import { JobService } from 'src/job/job.service';
import { getBufferFromBlobUrl } from 'src/lib/utils';
import { getCandidatesByPostedDate } from 'src/opensearch/post-opensearch';
import { RecruitmentService } from 'src/recruitment/recruitment.service';

const SPREADSHEET_ID = '1rhoX1vD9X8BmGokiXzirSSenaXy9zGMXzZlzDnZu4eE';

@Injectable()
export class FacebookService {
  constructor(
    private readonly recruitmentService: RecruitmentService,
    private readonly jobService: JobService,
    private readonly sheetsService: SheetsService,
  ) {}

  async onModuleInit() {
    console.log('--- Đang khởi động trình duyệt... ---');

    const data = await this.sheetsService.getData(SPREADSHEET_ID);
    const facebookAccountInfoArr = data.taiKhoanFB.map((r) => ({
      facebookName: r['TÀI KHOẢN'],
      cookieStr: r['Cookies'],
    }));
    facebookAccountInfoArr.forEach((info) => {
      console.log(
        `--- Mở Browser riêng cho tài khoản: ${info.facebookName} ---`,
      );
      this.openFacebook(info);
    });
  }

  async openFacebook(facebookAccountInfo: any) {
    const browser: Browser = await chromium.launch({
      headless: false,
      args: [
        '--start-maximized',
        '--disable-notifications',
        '--disable-features=Translate',
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-infobars',
        '--disable-blink-features=AutomationControlled',
      ],
    });

    const context = await browser.newContext({
      viewport: null,
      permissions: ['clipboard-read', 'clipboard-write'],
    });
    console.log('Đang nạp cookies từ file...');
    const cookies = JSON.parse(facebookAccountInfo.cookieStr);

    // Playwright dùng addCookies thay vì setCookie
    await context.addCookies(cookies);

    console.log('Nạp cookies thành công!');

    // const candidateRows = [
    //   {
    //     profileLink: 'https://www.facebook.com/messages/t/904318455764815/',
    //     searchLink:
    //       'https://vi.hellojob.jp/tim-viec-lam?q=bánh+mì&chi-tiet-loai-hinh-visa=dac-dinh-dau-nhat&nganh-nghe=Thực+phẩm&gioi-tinh=nu',
    //   },

    //   {
    //     profileLink: 'https://www.facebook.com/messages/t/964610043399170',
    //     searchLink:
    //       'https://vi.hellojob.jp/tim-viec-lam?chi-tiet-loai-hinh-visa=dac-dinh-dau-nhat&nganh-nghe=Thực+phẩm&dia-diem=Aichi',
    //   },

    //   {
    //     profileLink: 'https://www.facebook.com/messages/e2ee/t/881584677690241',
    //     searchLink:
    //       'https://vi.hellojob.jp/tim-viec-lam?chi-tiet-loai-hinh-visa=dac-dinh-dau-nhat&nganh-nghe=Th%E1%BB%B1c+ph%E1%BA%A9m&dia-diem=Aichi',
    //   },
    // ];

    const rows = await getCandidatesByPostedDate(1768064401);
    const candidateRows = rows
      .filter((r) => r.senderLink && r.searchLink)
      .map((r) => {
        const link = r.senderLink;

        let id = '';

        if (!link.includes('facebook.com')) {
          return;
        }

        if (link.includes('profile.php?id=')) {
          id = link.split('profile.php?id=')[1].split('#')[0];
        } else {
          id = link.split('facebook.com/')[1].split('#')[0].split('?')[0];
        }

        return {
          _id: r._id,
          profileLink: `https://www.facebook.com/messages/t/${id}`,
          searchLink: r.searchLink,
        };
      });

    // Lặp qua từng ứng viên của nick facebook này
    candidateRows.forEach(async (candidateRow) => {
      context.newPage().then(async (page) => {
        try {
          await page.goto(candidateRow.profileLink, {
            waitUntil: 'domcontentloaded',
          });
          await this.sleep(15000);

          // nhập 000000
          // await page.keyboard.type('210604', { delay: 500 });
          // // // await page.keyboard.type('000000', { delay: 1000 });
          // await this.sleep(10000);

          await page.getByRole('button', { name: 'Tiếp tục' }).click();
          await this.sleep(10000);

          const searchInput = await page.waitForSelector(
            'div[aria-label="Tin nhắn"]',
          );
          await this.sleep(1000);

          await searchInput?.click();

          await page.keyboard.press('Control+A');
          await page.keyboard.press('Backspace');

          // Lấy những đơn phù hợp dựa vào searchLink
          const matchingJobs =
            await this.jobService.findMatchingJobs(candidateRow);

          for (const job of matchingJobs) {
            // Gửi ảnh form đơn
            let tempPath: string | null = null;
            try {
              const blob = await this.jobService.getJobFormImage(
                job.formImageHJ,
              );
              const imageBuffer = await getBufferFromBlobUrl(blob);

              tempPath = path.join(
                process.cwd(),
                `temp_upload_${Date.now()}.png`,
              );

              fs.writeFileSync(tempPath, imageBuffer);

              await this.uploadImageProperly(page, tempPath);
              await this.sleep(1000);
            } catch (e) {
              console.error('Lỗi khi xử lý ảnh:', e);
            } finally {
              if (tempPath && fs.existsSync(tempPath)) {
                fs.unlinkSync(tempPath);
              }
            }
            // gửi mô tả đơn
            const aiContent = job.aiContent;
            await this.submitChat(page, aiContent);
            await this.sleep(2000);
            // gửi link đơn
            await this.submitChat(
              page,
              `https://vi.hellojob.jp/${job.nameAscii}.html`,
            );
            await this.sleep(5000);
          }

          await this.submitChat(page, 'Em ơi có đơn mới này, em xem ok không');
          await this.sleep(1200);

          // Update trạng thái trong opensearch của những ứng viên đã gửi
          await updateCandidateStatus(candidateRow._id, 'APPROACHED');

          // LƯU Ý: cần lưu lại thông tin lastViewedTime vào sheet và OpenSearch để lần sau gửi sẽ lọc ra những đơn mới hơn
        } catch (error) {
          console.error(error);
        }
      });
    });
  }

  private async submitChat(page: Page, message: string) {
    await page.evaluate((text) => {
      const input = document.activeElement as HTMLElement;

      const dataTransfer = new DataTransfer();
      dataTransfer.setData('text/plain', text);

      const event = new ClipboardEvent('paste', {
        clipboardData: dataTransfer,
        bubbles: true,
        cancelable: true,
      });

      input.dispatchEvent(event);

      if (!event.defaultPrevented) {
        document.execCommand('insertText', false, text);
      }
    }, message);

    await this.sleep(1000);
    await page.keyboard.press('Enter');
  }

  async uploadImageProperly(page: Page, filePath: string) {
    await page.evaluate(() => {
      const input = document.createElement('input');
      input.type = 'file';
      input.id = 'temp-upload';
      input.style.display = 'none';
      document.body.appendChild(input);
    });

    const inputHandle = await page.$('#temp-upload');
    await inputHandle?.setInputFiles(filePath);

    await page.evaluate((selectorChat) => {
      const input = document.getElementById('temp-upload') as HTMLInputElement;

      const chatBox = document.querySelector(selectorChat) as HTMLElement;

      if (input.files?.length) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(input.files[0]);

        const event = new ClipboardEvent('paste', {
          clipboardData: dataTransfer,
          bubbles: true,
          cancelable: true,
        });

        chatBox.dispatchEvent(event);
      }

      input.remove();
    }, 'div[aria-label="Tin nhắn"]');

    await this.sleep(3000);
    await page.keyboard.press('Enter');
  }

  private sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
