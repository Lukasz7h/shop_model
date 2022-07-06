"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailconfig = void 0;
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
exports.mailconfig = {
    transport: {
        host: 'smtp.googlemail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
            user: "luuukasz368@gmail.com",
            pass: "Jasu56bibicun67viv"
        },
    },
    defaults: {
        from: 'luuukasz368@gmail.com',
    },
    template: {
        dir: __dirname + '/templates',
        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
        options: {
            strict: true,
        },
    },
};
//# sourceMappingURL=mailerconfig.js.map