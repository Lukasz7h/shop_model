import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendMail(to: string, subject: string, basket: object[]): Promise<{
        error: any;
    }>;
}
