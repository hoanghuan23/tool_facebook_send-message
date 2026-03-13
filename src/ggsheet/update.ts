import { Injectable } from '@nestjs/common';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { GoogleAuth } from 'google-auth-library';
import * as creds from './service-account.json';

@Injectable()
export class update_statusJourney {
  async updateStatusJourneyInOpenSearch(
    documentId: string,
    statusJourney: string,
    openSearchClient: any,
    index: string,
  ): Promise<void> {
    await openSearchClient.update({
      index,
      id: documentId,
      body: {
        doc: {
          statusJourney,
        },
      },
    });
  }
}
