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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasketController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const filter_1 = require("../../globalFilter/filter");
const basket_service_1 = require("./basket.service");
let BasketController = class BasketController {
    constructor(basketService) {
        this.basketService = basketService;
    }
    addToBasket(product, req) {
        const token = req["user"]["token"];
        this.basketService.addProduct(product, token);
    }
    changeBasket(productData, req) {
        const token = req["user"]["token"];
        const _productData = JSON.parse(productData.data);
        return this.basketService.changeCountProduct(_productData.product, _productData.count, token);
    }
    async getProducts(req) {
        const token = req["user"]["token"];
        return await this.basketService.getProducts(token);
    }
    async removeFromBasket(req, productName, type) {
        const token = req["user"]["token"];
        return this.basketService.removeFromBasket(productName, type, token);
    }
    cors() { }
    async addOrderData(data, req) {
        const token = req["user"]["token"];
        const orderData = JSON.parse(data.orderData);
        return await this.basketService.addOrderData(orderData, token);
    }
    options() { }
    async isBasketEmpty(req) {
        return await this.basketService.userBasket(req.cookies.jwt.token);
    }
    async updatePaymantMethod(method, req) {
        const jwt = req["user"]["token"];
        method = JSON.parse(method["data"]);
        return await this.basketService.updateDataOrder(jwt, method);
    }
    updatePaymant() { }
};
__decorate([
    (0, common_1.Post)("/add"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.UseFilters)(filter_1.Filter),
    (0, common_1.Header)("Access-Control-Allow-Origin", "http://localhost:4200"),
    (0, common_1.Header)("Access-Control-Allow-Credentials", "true"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BasketController.prototype, "addToBasket", null);
__decorate([
    (0, common_1.Post)("/productCount"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.UseFilters)(filter_1.Filter),
    (0, common_1.Header)("Access-Control-Allow-Origin", "http://localhost:4200"),
    (0, common_1.Header)("Access-Control-Allow-Credentials", "true"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BasketController.prototype, "changeBasket", null);
__decorate([
    (0, common_1.Get)("/view"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.UseFilters)(filter_1.Filter),
    (0, common_1.Header)("Access-Control-Allow-Origin", "http://localhost:4200"),
    (0, common_1.Header)("Access-Control-Allow-Credentials", "true"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BasketController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Delete)("/delete/:productName/:type"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.UseFilters)(filter_1.Filter),
    (0, common_1.Header)("Access-Control-Allow-Origin", "http://localhost:4200"),
    (0, common_1.Header)("Access-Control-Allow-Credentials", "true"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("productName")),
    __param(2, (0, common_1.Param)("type")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], BasketController.prototype, "removeFromBasket", null);
__decorate([
    (0, common_1.Options)("/delete/:productName/:type"),
    (0, common_1.UseFilters)(filter_1.Filter),
    (0, common_1.Header)("Access-Control-Allow-Origin", "http://localhost:4200"),
    (0, common_1.Header)("Access-Control-Allow-Credentials", "true"),
    (0, common_1.Header)("Access-Control-Allow-Methods", "DELETE"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BasketController.prototype, "cors", null);
__decorate([
    (0, common_1.Post)("/order"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.Header)("Access-Control-Allow-Origin", "http://localhost:4200"),
    (0, common_1.Header)("Access-Control-Allow-Credentials", "true"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BasketController.prototype, "addOrderData", null);
__decorate([
    (0, common_1.Options)("/order"),
    (0, common_1.Header)("Access-Control-Allow-Origin", "http://localhost:4200"),
    (0, common_1.Header)("Access-Control-Allow-Credentials", "true"),
    (0, common_1.Header)("Access-Control-Allow-Methods", "POST"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BasketController.prototype, "options", null);
__decorate([
    (0, common_1.Get)("/empty"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BasketController.prototype, "isBasketEmpty", null);
__decorate([
    (0, common_1.Patch)("/paymant"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.Header)("Access-Control-Allow-Origin", "http://localhost:4200"),
    (0, common_1.Header)("Access-Control-Allow-Credentials", "true"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BasketController.prototype, "updatePaymantMethod", null);
__decorate([
    (0, common_1.Options)("/paymant"),
    (0, common_1.Header)("Access-Control-Allow-Origin", "http://localhost:4200"),
    (0, common_1.Header)("Access-Control-Allow-Credentials", "true"),
    (0, common_1.Header)("Access-Control-Allow-Methods", "PATCH"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BasketController.prototype, "updatePaymant", null);
BasketController = __decorate([
    (0, common_1.Controller)('basket'),
    __metadata("design:paramtypes", [basket_service_1.BasketService])
], BasketController);
exports.BasketController = BasketController;
;
//# sourceMappingURL=basket.controller.js.map