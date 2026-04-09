import 'dotenv/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TransformInterceptor } from './core/transform.interceptor';

// Ham bootstrap la diem bat dau chay cua ung dung NestJS.
async function bootstrap() {
  // Tao ung dung NestJS tu AppModule.
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const reflector = app.get(Reflector);

  // Dang ky JWT guard o muc global theo cach khoi tao trong main.ts.
  // Route nao can bo qua xac thuc thi gan them @Public().
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  // Khai bao thu muc chua file tinh nhu css, js, image.
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Khai bao thu muc chua cac file view.
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  // Chon template engine la EJS.
  app.setViewEngine('ejs');

  // Bat validate du lieu tu dong cho tat ca request dua tren DTO.
  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  // config Cors
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  });

  app.setGlobalPrefix('api');
  //config version link
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  // Chay server o cong PORT trong file .env, neu khong co thi dung cong 3000.
  await app.listen(process.env.PORT || 3000);
}

// Goi ham de khoi dong ung dung.
bootstrap();
