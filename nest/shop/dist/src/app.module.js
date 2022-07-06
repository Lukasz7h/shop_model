"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const stuff_module_1 = require("./stuff/stuff/stuff.module");
const auth_module_1 = require("./auth/auth.module");
const basket_module_1 = require("./basket/basket/basket.module");
const valid_order_data_form_service_1 = require("./basket/valid-order-data-form/valid-order-data-form.service");
const mail_module_1 = require("./mail/mail.module");
const user_data_module_1 = require("./user-data/user-data.module");
const socket_module_1 = require("./socket/comment/socket.module");
const chat_module_1 = require("./socket/chat/chat.module");
const uniq_cookie_controller_1 = require("./uniq-cookie/uniq-cookie.controller");
const uniq_cookie_service_1 = require("./uniq-cookie/uniq-cookie.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            stuff_module_1.StuffModule,
            auth_module_1.AuthModule,
            basket_module_1.BasketModule,
            mail_module_1.MailModule,
            user_data_module_1.UserDataModule,
            socket_module_1.SocketModule,
            chat_module_1.ChatModule
        ],
        controllers: [app_controller_1.AppController, uniq_cookie_controller_1.UniqCookieController],
        providers: [
            app_service_1.AppService,
            valid_order_data_form_service_1.ValidOrderDataFormService,
            uniq_cookie_service_1.UniqCookieService
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map