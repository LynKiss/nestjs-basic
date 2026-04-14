// Injectable de Nest inject MailService vao controller/module khac.
import { Injectable } from '@nestjs/common';
// ConfigService dung de doc email nhan test va email gui mac dinh tu .env.
import { ConfigService } from '@nestjs/config';
// MailerService la service chinh cua @nestjs-modules/mailer de gui email.
import { MailerService } from '@nestjs-modules/mailer';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Job, JobDocument } from '../jobs/schemas/job.schema';
import {
  Subscriber,
  SubscriberDocument,
} from '../subscribers/schemas/subscriber.schema';

@Injectable()
export class MailService {
  // Constructor inject MailerService va ConfigService.
  constructor(
    // mailerService dung de goi ham sendMail().
    private mailerService: MailerService,
    // configService dung de doc bien moi truong.
    private configService: ConfigService,
    @InjectModel(Subscriber.name)
    private subscriberModel: SoftDeleteModel<SubscriberDocument>,
    @InjectModel(Job.name)
    private jobModel: SoftDeleteModel<JobDocument>,
  ) {}

  // Gui email job matching cho subscriber bang Handlebars template.
  async sendSubscriberJobEmails(to?: string) {
    const fromEmail =
      this.configService.get<string>('EMAIL_FROM') ||
      this.configService.get<string>('EMAIL_USER') ||
      '';

    const subscribers = await this.subscriberModel.find({}).lean();
    const recipients: string[] = [];
    let skipped = 0;

    for (const subs of subscribers) {
      const subsSkills = subs.skills ?? [];

      if (!subsSkills.length) {
        skipped += 1;
        continue;
      }

      const jobWithMatchingSkills = await this.jobModel
        .find({
          skills: { $in: subsSkills },
          isActive: true,
        })
        .lean();

      if (!jobWithMatchingSkills.length) {
        skipped += 1;
        continue;
      }

      const jobs = jobWithMatchingSkills.map((item) => ({
        name: item.name,
        company: item.company?.name ?? '',
        salary: `${new Intl.NumberFormat('vi-VN').format(item.salary ?? 0)} đ`,
        skills: item.skills ?? [],
      }));

      const targetEmail = to || subs.email;

      await this.mailerService.sendMail({
        to: targetEmail,
        from: `"Support Team" <${fromEmail}>`,
        subject: 'Welcome to Nice App! Confirm your Email',
        template: 'test',
        context: {
          receiver: subs.name || subs.email,
          jobs,
        },
      });

      recipients.push(targetEmail);

      if (to) {
        break;
      }
    }

    return {
      sent: recipients.length,
      skipped,
      recipients,
    };
  }
}
