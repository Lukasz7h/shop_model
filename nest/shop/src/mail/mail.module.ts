import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';

import { mailconfig } from 'mailerconfig';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot(mailconfig)
  ],
  providers: [MailService]
})
export class MailModule {}
