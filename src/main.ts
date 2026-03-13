import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getCandidatesByPostedDate } from './opensearch/post-opensearch';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const rows = await getCandidatesByPostedDate(1768064401);
  console.log(rows.slice(0, 2));

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
