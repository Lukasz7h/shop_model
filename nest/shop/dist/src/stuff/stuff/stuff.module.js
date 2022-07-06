"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StuffModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const stuff_controller_1 = require("./stuff.controller");
const stuff_service_1 = require("./stuff.service");
const users_entity_1 = require("../../entities/users.entity");
const products_entity_1 = require("../../entities/products.entity");
const basket_entity_1 = require("../../entities/basket.entity");
const products_details_entity_1 = require("../../entities/products-details.entity");
const users_order_data_entity_1 = require("../../entities/users-order-data.entity");
let StuffModule = class StuffModule {
};
StuffModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(),
            typeorm_1.TypeOrmModule.forFeature([users_entity_1.Users, products_entity_1.Products, basket_entity_1.Basket, products_details_entity_1.ProductsDetails, users_order_data_entity_1.UsersOrderData])
        ],
        controllers: [stuff_controller_1.StuffController],
        providers: [stuff_service_1.StuffService]
    })
], StuffModule);
exports.StuffModule = StuffModule;
//# sourceMappingURL=stuff.module.js.map