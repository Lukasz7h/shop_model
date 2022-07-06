import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

export const mailconfig = {
    transport: {
        host: 'smtp.googlemail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
            user: "shopmodelmy@gmail.com",
            pass: "sUwweB8s2vTf3ZC"
        },
    },
    defaults: {
        from: 'shopmodelmy@gmail.com',
    },
    
    template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
    },
}