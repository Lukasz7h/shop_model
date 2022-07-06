"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
let MailService = class MailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendMail(to, subject, basket) {
        try {
            let sentence = "";
            let prizeOfAll = 0;
            for (let e of basket) {
                sentence += "<b>Nazwa</b>: " + e['product']['name'] + '<br>';
                const prize = Math.round(e['productCount'] * e['product']['price'] * 100) / 100;
                prizeOfAll += prize;
                sentence += "<b>Cena</b>: " + prize + 'zł<br>';
                sentence += "<b>Rozmiar</b>: " + e["size"] + "<br>";
            }
            ;
            sentence += "<b>Cena za wszystko</b>: " + prizeOfAll + "zł";
            await this.mailerService.sendMail({ to, subject, html: sentence });
        }
        catch (e) {
            return {
                error: e.message
            };
        }
        ;
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
exports.MailService = MailService;
;
//# sourceMappingURL=mail.service.js.map