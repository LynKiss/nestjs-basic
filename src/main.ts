import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';
import { AppModule } from './app.module';

// Ham bootstrap la diem bat dau chay cua ung dung NestJS.
async function bootstrap() {
  // Tao ung dung NestJS tu AppModule.
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Khai bao thu muc chua file tinh nhu css, js, image.
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Khai bao thu muc chua cac file view.
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  // Chon template engine la EJS.
  app.setViewEngine('ejs');

  // Bat validate du lieu tu dong cho tat ca request dua tren DTO.
  app.useGlobalPipes(new ValidationPipe());

  // Chay server o cong PORT trong file .env, neu khong co thi dung cong 3000.
  await app.listen(process.env.PORT || 3000);
}

// Goi ham de khoi dong ung dung.
bootstrap();
