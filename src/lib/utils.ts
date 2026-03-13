const visasForVndDisplay = [
    'Thực tập sinh 3 năm',
    'Thực tập sinh 1 năm',
    'Đặc định đi mới',
    'Kỹ sư, tri thức đầu Việt',
];
const JPY_VND_RATE = 180; // Example rate
const USD_VND_RATE = 26300; // Example rate
export const formatVisa = (visa: string | null) => {
    return visa?.replace('Tokutei', 'Đặc định') ?? null;
};
export const formatCurrency = (value?: string) => {
    if (!value) return 'N/A';
    return ('' + value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatSalaryForDisplay = (salaryValue?: any, visaDetail?: string | any): string => {
    if (!salaryValue) return 'Liên hệ';

    const numericValue = parseInt(('' + salaryValue).replace(/[^0-9]/g, ''), 10);
    if (isNaN(numericValue)) return salaryValue;
    if (visaDetail && visasForVndDisplay.includes(visaDetail)) {
        const vndValue = numericValue * JPY_VND_RATE;
        const valueInMillions = vndValue / 1000000;

        if (valueInMillions % 1 === 0) {
            return `${valueInMillions.toLocaleString('vi-VN')}tr`;
        }

        const formattedVnd = valueInMillions.toLocaleString('vi-VN', {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        });
        return `${formattedVnd.replace('.', ',')}tr`;
    }

    return `${formatCurrency(salaryValue)} JPY`;
};
export const generateBulletJobCrawl = (data: any) => {
    const { job, visa, career, languageLevel, numberRecruits, gender, workLocation, basicSalary } = data;
    let specialConditions = data.specialConditions;
    specialConditions = formatSpecialCondition(specialConditions);
    const details = [
        job ?? career,
        workLocation,
        languageLevel,
        numberRecruits ? `${numberRecruits} ${getGenderLabel(gender)}` : gender ? getGenderLabel(gender) : null,
        basicSalary ? `LCB ${formatSalaryForDisplay(basicSalary, formatVisa(visa))}` : null,
        specialConditions ? specialConditions.join(",") : null,
    ]
        .filter(Boolean)
        .join(", ");

    return details;
};

export const formatSpecialCondition = (specialConditions: any) => {
    if (typeof specialConditions === "string") {
        specialConditions = specialConditions.split(", ");
    }
    return specialConditions ?? [];
};

export const getGenderLabel = (gender: any) => {
    if (gender === "MALE") {
        return "Nam";
    } else if (gender === "FEMALE") {
        return "Nữ";
    } else if (gender === "BOTH") {
        return "Nam/Nữ";
    } else {
        return "";
    }
};

export const generateHtmlFromMarkdown = (visaDetail: string, details: { stt: string, hangMuc: string, noiDung: string }[] | null): string | null => {
    if (!details?.length || !visaDetail) return null;
    const visa = formatVisa(visaDetail);

    // Convert Markdown table to HTML table

    let tableHtml = '';
    const sttStyle = 'padding: 8px 6px; border: 1px solid #e5e7eb; text-align: center; background-color: #AFC536;';
    const cellStyle = 'padding: 8px 6px; border: 1px solid #e5e7eb;';
    details.forEach(({ stt, hangMuc, noiDung }, index) => {
        const desc = noiDung.replace(/(\*\*|__)(.*?)\1/g, "<b>$2</b>").replace(/\*(.*?)\*/g, "<i>$1</i>");
        tableHtml +=
            `<tr>
      <td style="${sttStyle}">${stt}</td>
      <td style="${cellStyle}">${hangMuc}</td>
      <td style="${cellStyle}">${desc}</td>
    </tr>`;
    });

    const fullHtml = `
      <!DOCTYPE html>
      <html lang="vi">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thông Báo Đơn Hàng: ${visa}</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Noto+Sans+JP:wght@100..900&display=swap" rel="stylesheet">
          <style>
              body { font-family: 'Montserrat','Noto Sans JP', 'Arial', sans-serif; margin: 0; padding: 0; color: #111827; }
              .container { width: 100%; max-width: 794px; margin: auto; background-color: white; padding: 1rem 0 0; box-sizing: border-box; }
              h1, h2 { text-align: center; color: #111827; }
              h1 { font-size: 1.5rem; font-weight: bold; margin-bottom: 0;margin-top:0 }
              h2 { font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; margin-top:0 }
              table { width: 100%; border-collapse: collapse; font-size: 12pt;line-height:1.3rem }
              th, td { padding: 8px; border: 1px solid #e5e7eb; text-align: left; word-break: break-word; color: #111827; }
              th { background-color: #19A6DF; color: white; text-align: center; }
          </style>
      </head>
      <body>
          <div class="container">
              <h1></h1>
              <h2>${visa}</h2>
              <table>
                  <thead>
                      <tr>
                          <th style="width:25px">STT</th>
                          <th style="width:100px">Hạng mục</th>
                          <th>Nội dung</th>
                      </tr>
                  </thead>
                  <tbody>
                      ${tableHtml}
                      <tr>
                        <td colspan="3" style="background-color: #F2B92A; text-align: center; font-weight: bold;">MỌI THÔNG TIN KHÔNG CÓ TRONG ĐƠN HÀNG SẼ HỎI KHI PHỎNG VẤN</td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </body>
      </html>
    `;

    return fullHtml;
};
export const getBufferFromBlobUrl = async (blob): Promise<Buffer> => {
    const arrayBuffer = await blob.arrayBuffer();

    // Xóa phần đầu "data:image/png;base64," để lấy dữ liệu thô
    return Buffer.from(arrayBuffer);
}

export function capitalize(str = "") {
  return str.charAt(0).toUpperCase() + str.slice(1);
}