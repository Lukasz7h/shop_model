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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersOrderData = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
let UsersOrderData = class UsersOrderData {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UsersOrderData.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UsersOrderData.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UsersOrderData.prototype, "surname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UsersOrderData.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UsersOrderData.prototype, "post_code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UsersOrderData.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UsersOrderData.prototype, "house_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UsersOrderData.prototype, "apartment_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UsersOrderData.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UsersOrderData.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UsersOrderData.prototype, "paymant", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(entity => users_entity_1.Users, type => type.orderData),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", users_entity_1.Users)
], UsersOrderData.prototype, "user", void 0);
UsersOrderData = __decorate([
    (0, typeorm_1.Entity)()
], UsersOrderData);
exports.UsersOrderData = UsersOrderData;
;
//# sourceMappingURL=users-order-data.entity.js.map