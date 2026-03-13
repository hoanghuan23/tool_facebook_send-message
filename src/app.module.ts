import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FacebookService } from './facebook/facebook.service';
import { ConfigModule } from '@nestjs/config';
import { OpenSearchUtils } from './opensearch/opensearch.service';
import { JobService } from './job/job.service';
import { RecruitmentService } from './recruitment/recruitment.service';
import { FacebookCookiesService } from './facebook-cookies/facebook-cookies.service';
import { SheetsService } from './ggsheet/sheets.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Giúp các service khác dùng được luôn mà không cần import lại
    })
  ],
  controllers: [AppController],
  providers: [AppService,
    // FacebookService,
    OpenSearchUtils,
    JobService,
    RecruitmentService,
    SheetsService,
    // FacebookCookiesService
  ],
})
export class AppModule { }
