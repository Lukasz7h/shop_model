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
exports.Products = void 0;
const typeorm_1 = require("typeorm");
const basket_entity_1 = require("./basket.entity");
const products_details_entity_1 = require("./products-details.entity");
let Products = class Products {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Products.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 120
    }),
    __metadata("design:type", String)
], Products.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 6
    }),
    __metadata("design:type", String)
], Products.prototype, "season", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 6
    }),
    __metadata("design:type", String)
], Products.prototype, "bodyPart", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar"
    }),
    __metadata("design:type", String)
], Products.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "float"
    }),
    __metadata("design:type", Number)
], Products.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 1480,
        nullable: true
    }),
    __metadata("design:type", String)
], Products.prototype, "photosName", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(entity => products_details_entity_1.ProductsDetails, type => type.product),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", products_details_entity_1.ProductsDetails)
], Products.prototype, "detail", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(entity => basket_entity_1.Basket, type => type.product),
    __metadata("design:type", basket_entity_1.Basket)
], Products.prototype, "basket", void 0);
Products = __decorate([
    (0, typeorm_1.Entity)()
], Products);
exports.Products = Products;
//# sourceMappingURL=products.entity.js.map