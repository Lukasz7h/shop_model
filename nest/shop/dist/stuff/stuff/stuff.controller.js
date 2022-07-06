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
exports.StuffController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const stuff_service_1 = require("./stuff.service");
const passport_1 = require("@nestjs/passport");
const filter_1 = require("../../globalFilter/filter");
let StuffController = class StuffController {
    constructor(stuffServ) {
        this.stuffServ = stuffServ;
    }
    async getProducts(season, group, bodyPart, req) {
        return await this.stuffServ.getStuff(season, group, bodyPart);
    }
    async getProductsOfProperties(season, group, bodyPart, dataPrice) {
        dataPrice = JSON.parse(dataPrice.properties);
        return await this.stuffServ.getStuff(season, group, bodyPart, dataPrice);
    }
    withParams() { }
    async getProductDetail(id) {
        return await this.stuffServ.getDetailsOfProduct(id);
    }
    async getProductPhotos(id, i, res) {
        return await this.stuffServ.getPhotosOfProduct(id, i, res);
    }
    async addStuff(stuff, req, photos) {
        const _stuff = JSON.parse(stuff.productData);
        const token = req["user"]['token'];
        return await this.stuffServ.addStuff(_stuff, photos, token);
    }
};
__decorate([
    (0, common_1.Get)("/sezon/:period/:group/:bodyPart"),
    (0, common_1.Header)("Access-Control-Allow-Origin", "http://localhost:4200"),
    (0, common_1.Header)("Access-Control-Allow-Credentials", "true"),
    __param(0, (0, common_1.Param)("period")),
    __param(1, (0, common_1.Param)("group")),
    __param(2, (0, common_1.Param)("bodyPart")),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], StuffController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Post)("/sezon/:period/:group/:bodyPart"),
    (0, common_1.Header)("Access-Control-Allow-Origin", "http://localhost:4200"),
    (0, common_1.Header)("Access-Control-Allow-Credentials", "true"),
    __param(0, (0, common_1.Param)("period")),
    __param(1, (0, common_1.Param)("group")),
    __param(2, (0, common_1.Param)("bodyPart")),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], StuffController.prototype, "getProductsOfProperties", null);
__decorate([
    (0, common_1.Options)("/sezon/:period/:group/:bodyPart"),
    (0, common_1.Header)("Access-Control-Allow-Origin", "http://localhost:4200"),
    (0, common_1.Header)("Access-Control-Allow-Credentials", "true"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StuffController.prototype, "withParams", null);
__decorate([
    (0, common_1.Get)("/detail/:id"),
    (0, common_1.Header)("Access-Control-Allow-Origin", "http://localhost:4200"),
    (0, common_1.Header)("Access-Control-Allow-Credentials", "true"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StuffController.prototype, "getProductDetail", null);
__decorate([
    (0, common_1.Get)("/detail/photos/:id/:i"),
    (0, common_1.UseFilters)(new filter_1.Filter()),
    (0, common_1.Header)("Access-Control-Allow-Origin", "http://localhost:4200"),
    (0, common_1.Header)("Access-Control-Allow-Credentials", "true"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)("i", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], StuffController.prototype, "getProductPhotos", null);
__decorate([
    (0, common_1.Post)("/add"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: "files" }
    ])),
    (0, common_1.Header)("Access-Control-Allow-Origin", "http://localhost:4200"),
    (0, common_1.Header)("Access-Control-Allow-Credentials", "true"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Array]),
    __metadata("design:returntype", Promise)
], StuffController.prototype, "addStuff", null);
StuffController = __decorate([
    (0, common_1.Controller)('stuff'),
    __metadata("design:paramtypes", [stuff_service_1.StuffService])
], StuffController);
exports.StuffController = StuffController;
//# sourceMappingURL=stuff.controller.js.map