// sheets.service.ts
import { Injectable } from '@nestjs/common';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import * as creds from './service-account.json';
import { GoogleAuth } from 'google-auth-library';

@Injectable()
export class SheetsService {
  async getData(SPREADSHEET_ID: string) {
    const auth = new GoogleAuth({
      credentials: creds,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, auth);

    await doc.loadInfo();
    const sheet = doc.sheetsByTitle['3. Ứng viên'];
    const sheet1 = doc.sheetsByTitle['2. Tài khoản FB'];

    const rows = await sheet.getRows();
    const rows1 = await sheet1.getRows();

    // return rows.map(r => r.toObject());

    return {
      ungVien: rows.map((r) => r.toObject()),
      taiKhoanFB: rows1.map((r) => r.toObject()),
    };
  }
}
