import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {

    constructor(
        private mailerService: MailerService
    ){}

    // wysyłamy mail do użytkownika który dokonał zakupu
    async sendMail(to: string, subject: string, basket: object[])
    {
        try
        {
            let sentence: string = "";
            let prizeOfAll: number = 0;
            for(let e of basket)
            {
                sentence += "<b>Nazwa</b>: "+e['product']['name']+'<br>';
                const prize: number = Math.round(e['productCount'] * e['product']['price'] * 100) / 100;

                prizeOfAll += prize;
                sentence += "<b>Cena</b>: "+prize+'zł<br>';

                sentence += "<b>Rozmiar</b>: "+e["size"]+"<br>";
            };

            sentence += "<b>Cena za wszystko</b>: "+prizeOfAll+"zł";
            await this.mailerService.sendMail({to, subject, html: sentence});
        }
        catch(e)
        {
            return{
                error: e.message
            };
        };
        
    }
};