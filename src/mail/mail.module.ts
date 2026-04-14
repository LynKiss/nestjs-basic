// Module decorator de dinh nghia mail module trong NestJS.
import { Module } from '@nestjs/common';
// ConfigModule/ConfigService dung de doc SMTP config tu .env.
import { ConfigModule, ConfigService } from '@nestjs/config';
// MailerModule cung cap MailerService de gui email.
import { MailerModule } from '@nestjs-modules/mailer';
// HandlebarsAdapter co the dung khi mo rong sang gui mail bang template file.
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MongooseModule } from '@nestjs/mongoose';
// join dung de tro den thu muc template.
import { join } from 'node:path';
import { Job, JobSchema } from '../jobs/schemas/job.schema';
import {
  Subscriber,
  SubscriberSchema,
} from '../subscribers/schemas/subscriber.schema';
// Controller route test mail.
import { MailController } from './mail.controller';
// Service gui email.
import { MailService } from './mail.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subscriber.name, schema: SubscriberSchema },
      { name: Job.name, schema: JobSchema },
    ]),
    // Cau hinh MailerModule theo kieu async de doc bien moi truong linh hoat.
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          // SMTP host co the lay tu EMAIL_HOST theo bai hoc, hoac MAIL_HOST theo config hien tai.
          host:
            configService.get<string>('EMAIL_HOST') ||
            configService.get<string>('MAIL_HOST') ||
            'smtp.gmail.com',
          // Gmail thuong dung port 587 cho TLS/STARTTLS.
          port: Number(
            configService.get<string>('EMAIL_PORT') ||
              configService.get<string>('MAIL_PORT') ||
              587,
          ),
          // secure=false vi port 587 dung STARTTLS.
          secure: false,
          auth: {
            // User SMTP co the lay theo bai hoc hoac theo .env hien tai.
            user:
              configService.get<string>('EMAIL_AUTH_USER') ||
              configService.get<string>('EMAIL_USER') ||
              '',
            // Password SMTP co the lay theo bai hoc hoac theo .env hien tai.
            pass:
              configService.get<string>('EMAIL_AUTH_PASS') ||
              configService.get<string>('EMAIL_PASSWORD') ||
              '',
          },
        },
        defaults: {
          // Default from dung cho moi email neu khong override trong sendMail().
          from:
            configService.get<string>('EMAIL_FROM') ||
            configService.get<string>('EMAIL_USER') ||
            '',
        },
        // Cau hinh san template engine Handlebars de sau nay mo rong gui mail template de hon.
        template: {
          dir: join(process.cwd(), 'src', 'mail', 'templetes'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
