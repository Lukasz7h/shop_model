import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
export declare const mailconfig: {
    transport: {
        host: string;
        port: number;
        ignoreTLS: boolean;
        secure: boolean;
        auth: {
            user: string;
            pass: string;
        };
    };
    defaults: {
        from: string;
    };
    template: {
        dir: string;
        adapter: HandlebarsAdapter;
        options: {
            strict: boolean;
        };
    };
};
