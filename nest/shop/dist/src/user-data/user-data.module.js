"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const valid_order_data_form_service_1 = require("../basket/valid-order-data-form/valid-order-data-form.service");
const basket_entity_1 = require("../entities/basket.entity");
const order_entity_1 = require("../entities/order.entity");
const products_details_entity_1 = require("../entities/products-details.entity");
const products_entity_1 = require("../entities/products.entity");
const user_bought_entity_1 = require("../entities/user-bought.entity");
const users_order_data_entity_1 = require("../entities/users-order-data.entity");
const users_entity_1 = require("../entities/users.entity");
const mail_service_1 = require("../mail/mail.service");
const stuff_service_1 = require("../stuff/stuff/stuff.service");
const user_data_controller_1 = require("./user-data.controller");
const user_data_service_1 = require("./user-data.service");
let UserDataModule = class UserDataModule {
};
UserDataModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(),
            typeorm_1.TypeOrmModule.forFeature([
                basket_entity_1.Basket,
                users_entity_1.Users,
                users_order_data_entity_1.UsersOrderData,
                products_entity_1.Products,
                products_details_entity_1.ProductsDetails,
                order_entity_1.Order,
                user_bought_entity_1.UserBought
            ])
        ],
        controllers: [user_data_controller_1.UserDataController],
        providers: [
            user_data_service_1.UserDataService,
            valid_order_data_form_service_1.ValidOrderDataFormService,
            mail_service_1.MailService,
            stuff_service_1.StuffService
        ]
    })
], UserDataModule);
exports.UserDataModule = UserDataModule;
//# sourceMappingURL=user-data.module.js.map