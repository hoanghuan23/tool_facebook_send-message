import { Injectable, OnModuleInit } from '@nestjs/common';
import { chromium } from 'playwright';
import * as fs from 'fs-extra';
import { join } from 'path';

@Injectable()
export class FacebookCookiesService implements OnModuleInit {
  private readonly COOKIE_PATH = join(
    process.cwd(),
    'facebook_cookies_03.json'
  );

  async onModuleInit() {
    console.log('--- Đang kích hoạt tiến trình lấy Cookie... ---');
    await this.captureCookies();
  }

  async captureCookies() {
    // 1. Khởi tạo trình duyệt
    const browser = await chromium.launch({
      headless: false, // để login tay
      args: ['--start-maximized'],
    });

    const context = await browser.newContext({
      viewport: null,
    });

    const page = await context.newPage();

    try {
      console.log('Đang mở Facebook...');
      await page.goto('https://www.facebook.com', {
        waitUntil: 'networkidle',
      });

      console.log(
        'Bạn có 120 giây để đăng nhập thủ công trên trình duyệt...'
      );

      await new Promise((resolve) => setTimeout(resolve, 120000));

      // 2. Lấy cookies từ context (Playwright dùng context)
      const cookies = await context.cookies();

      // 3. Lưu cookies ra file
      await fs.writeJSON(this.COOKIE_PATH, cookies, {
        spaces: 2,
      });

      console.log(`Cookie đã được lưu tại: ${this.COOKIE_PATH}`);
    } catch (error) {
      console.error('Có lỗi xảy ra:', error);
    } finally {
      await browser.close();
      console.log('Trình duyệt đã đóng.');
    }
  }
}