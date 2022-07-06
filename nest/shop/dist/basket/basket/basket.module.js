"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasketModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_strategy_service_1 = require("../../auth/jwt-strategy/jwt-strategy.service");
const basket_entity_1 = require("../../entities/basket.entity");
const products_details_entity_1 = require("../../entities/products-details.entity");
const products_entity_1 = require("../../entities/products.entity");
const users_order_data_entity_1 = require("../../entities/users-order-data.entity");
const users_entity_1 = require("../../entities/users.entity");
const stuff_service_1 = require("../../stuff/stuff/stuff.service");
const valid_order_data_form_service_1 = require("../valid-order-data-form/valid-order-data-form.service");
const basket_controller_1 = require("./basket.controller");
const basket_service_1 = require("./basket.service");
let BasketModule = class BasketModule {
};
BasketModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(),
            typeorm_1.TypeOrmModule.forFeature([
                basket_entity_1.Basket,
                users_entity_1.Users,
                users_order_data_entity_1.UsersOrderData,
                products_entity_1.Products,
                products_details_entity_1.ProductsDetails
            ])
        ],
        controllers: [basket_controller_1.BasketController],
        providers: [
            basket_service_1.BasketService,
            stuff_service_1.StuffService,
            jwt_strategy_service_1.JwtStrategyService,
            valid_order_data_form_service_1.ValidOrderDataFormService
        ]
    })
], BasketModule);
exports.BasketModule = BasketModule;
//# sourceMappingURL=basket.module.js.map