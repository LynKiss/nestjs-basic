// Controller/Get/Query la cac decorator route cua NestJS.
import { Controller, Get, Query } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
// Public va ResponseMessage la decorator custom cua project.
import {
  Public,
  ResponseMessage,
  SkipCheckPermission,
} from '../decorator/customize';
// MailService chua nghiep vu gui mail.
import { MailService } from './mail.service';

@Controller({
  path: 'mail',
  version: '1',
})
export class MailController {
  // Inject MailService de controller goi gui email.
  constructor(private readonly mailService: MailService) {}

  // Cron gui mail dinh ky de match job voi subscriber.
  @Cron('0 5 0 * * 0')
  async handleCronSendMail() {
    return this.mailService.sendSubscriberJobEmails();
  }

  // Route test mail de kiem tra cau hinh SMTP.
  @Get()
  @Public()
  @SkipCheckPermission()
  @ResponseMessage('Test email')
  async handleTestEmail(
    // Cho phep truyen ?to=email@example.com de test gui toi email mong muon.
    @Query('to') to?: string,
  ) {
    // Goi service gui email bang template cho subscriber co job phu hop.
    return this.mailService.sendSubscriberJobEmails(to);
  }
}
