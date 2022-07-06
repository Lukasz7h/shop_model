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
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./order.entity");
const user_bought_entity_1 = require("./user-bought.entity");
const users_order_data_entity_1 = require("./users-order-data.entity");
let Users = class Users {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar"
    }),
    __metadata("design:type", String)
], Users.prototype, "login", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        nullable: true
    }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "tinyint",
        nullable: true
    }),
    __metadata("design:type", Number)
], Users.prototype, "number", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar"
    }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        nullable: true
    }),
    __metadata("design:type", String)
], Users.prototype, "currentToken", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "bool"
    }),
    __metadata("design:type", Boolean)
], Users.prototype, "isAdmin", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(entity => users_order_data_entity_1.UsersOrderData, type => type.user),
    __metadata("design:type", users_order_data_entity_1.UsersOrderData)
], Users.prototype, "orderData", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(entity => order_entity_1.Order, type => type.user),
    __metadata("design:type", Array)
], Users.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(entity => user_bought_entity_1.UserBought, type => type.user),
    __metadata("design:type", Array)
], Users.prototype, "bought", void 0);
Users = __decorate([
    (0, typeorm_1.Entity)()
], Users);
exports.Users = Users;
//# sourceMappingURL=users.entity.js.map