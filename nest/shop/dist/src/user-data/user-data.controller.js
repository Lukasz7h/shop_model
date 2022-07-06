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
exports.UserDataController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const user_data_service_1 = require("./user-data.service");
let UserDataController = class UserDataController {
    constructor(userDataService) {
        this.userDataService = userDataService;
    }
    async addOrderData(data, req) {
        const token = req["user"]["token"];
        const orderData = JSON.parse(data.orderData);
        return await this.userDataService.addOrderData(orderData, token);
    }
    async getOrderData(req) {
        const token = req["user"]["token"];
        return await this.userDataService.getOrderData(token);
    }
    async isBought(req) {
        const token = req["user"]["token"];
        return await this.userDataService.getOrderData(token);
    }
    async updatePaymantMethod(method, req) {
        const token = req["user"]["token"];
        method = JSON.parse(method["data"]);
        return await this.userDataService.updateDataOrder(token, method);
    }
    updatePayman() { }
    async userBought(req) {
        const token = req["user"]["token"];
        return await this.userDataService.isBought(token);
    }
    async addComment(commentData, req) {
        const token = req["user"]["token"];
        const comment = JSON.parse(commentData.addComm);
        return await this.userDataService.validComment(comment, token);
    }
    updatePaymant() { }
    async getComments(id) {
        return await this.userDataService.getComments(id);
    }
};
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
], UserDataController.prototype, "addOrderData", null);
__decorate([
    (0, common_1.Get)("/orderData"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.Header)("Access-Control-Allow-Origin", "http://localhost:4200"),
    (0, common_1.Header)("Access-Control-Allow-Credentials", "true"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserDataController.prototype, "getOrderData", null);
__decorate([
    (0, common_1.Get)("/bought"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.Header)("Access-Control-Allow-Origin", "http://localhost:4200"),
    (0, common_1.Header)("Access-Control-Allow-Credentials", "true"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserDataController.prototype, "isBought", null);
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
], UserDataController.prototype, "updatePaymantMethod", null);
__decorate([
    (0, common_1.Options)("/paymant"),
    (0, common_1.Header)("Access-Control-Allow-Origin", "http://localhost:4200"),
    (0, common_1.Header)("Access-Control-Allow-Credentials", "true"),
    (0, common_1.Header)("Access-Control-Allow-Methods", "PATCH"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserDataController.prototype, "updatePayman", null);
__decorate([
    (0, common_1.Get)("/user-bought"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.Header)("Access-Control-Allow-Origin", "http://localhost:4200"),
    (0, common_1.Header)("Access-Control-Allow-Credentials", "true"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserDataController.prototype, "userBought", null);
__decorate([
    (0, common_1.Post)("/add-comment"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.Header)("Access-Control-Allow-Origin", "http://localhost:4200"),
    (0, common_1.Header)("Access-Control-Allow-Credentials", "true"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserDataController.prototype, "addComment", null);
__decorate([
    (0, common_1.Options)("/add-comment"),
    (0, common_1.Header)("Access-Control-Allow-Origin", "http://localhost:4200"),
    (0, common_1.Header)("Access-Control-Allow-Credentials", "true"),
    (0, common_1.Header)("Access-Control-Allow-Methods", "PATCH, POST, GET"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserDataController.prototype, "updatePaymant", null);
__decorate([
    (0, common_1.Get)("/comments/:id"),
    (0, common_1.Header)("Access-Control-Allow-Origin", "http://localhost:4200"),
    (0, common_1.Header)("Access-Control-Allow-Credentials", "true"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserDataController.prototype, "getComments", null);
UserDataController = __decorate([
    (0, common_1.Controller)('user-data'),
    __metadata("design:paramtypes", [user_data_service_1.UserDataService])
], UserDataController);
exports.UserDataController = UserDataController;
//# sourceMappingURL=user-data.controller.js.map