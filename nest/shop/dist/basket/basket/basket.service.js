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
exports.BasketService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const basket_entity_1 = require("../../entities/basket.entity");
const users_order_data_entity_1 = require("../../entities/users-order-data.entity");
const stuff_service_1 = require("../../stuff/stuff/stuff.service");
const typeorm_2 = require("typeorm");
const valid_order_data_form_service_1 = require("../valid-order-data-form/valid-order-data-form.service");
const users_entity_1 = require("../../entities/users.entity");
const products_entity_1 = require("../../entities/products.entity");
let BasketService = class BasketService {
    constructor(stuffService, validServ, basket, users, products, usersOrderRepo) {
        this.stuffService = stuffService;
        this.validServ = validServ;
        this.basket = basket;
        this.users = users;
        this.products = products;
        this.usersOrderRepo = usersOrderRepo;
    }
    async addProduct(product, token) {
        const _product = JSON.parse(product["product"]).data;
        try {
            const stuff = await this.products.findOne({ id: _product.id });
            if (!stuff)
                throw new common_1.UnauthorizedException();
            const user = await this.users.findOne({ currentToken: token });
            if (!user)
                throw new common_1.UnauthorizedException();
            const addToBasket = new basket_entity_1.Basket();
            const count = JSON.parse(product["product"]).count;
            addToBasket.userId = user.id;
            addToBasket.productCount = count;
            addToBasket.group = _product.type;
            addToBasket.product = stuff;
            const basketStuff = await this.basket.findOne({
                product: stuff
            });
            if (basketStuff) {
                await this.basket.update(basketStuff, {
                    productCount: basketStuff.productCount + count
                });
                return {
                    updateBasket: true
                };
            }
            ;
            await this.basket.save(addToBasket);
        }
        catch (e) {
            return {
                error: e.message
            };
        }
        ;
    }
    async getProducts(jwt) {
        try {
            const user = await this.users.findOne({ currentToken: jwt });
            if (!user) {
                throw new Error(JSON.stringify({ error: true, type: "not_found" }));
            }
            ;
            const userID = user.id;
            const relations = await this.basket.find({ where: {
                    userId: userID
                },
                relations: ["product"],
                select: [
                    "productCount",
                ]
            });
            for (let e in relations) {
                if (relations[e] === null)
                    delete relations[e];
                if (typeof relations[e] === "object") {
                    for (let x in relations[e]) {
                        if (relations[e][x] !== null) {
                            if (relations[e][x]['id'])
                                delete relations[e][x]['id'];
                            if (relations[e][x] === null || !relations[e][x])
                                delete relations[e][x];
                        }
                        else {
                            delete relations[e][x];
                        }
                        ;
                    }
                    ;
                }
                ;
            }
            ;
            return relations;
        }
        catch (e) {
            return e.message;
        }
        ;
    }
    async removeFromBasket(productName, type, token) {
        try {
            const user = await this.users.findOne({ currentToken: token });
            if (!user)
                throw new common_1.UnauthorizedException();
            const _product = await this.products.findOne({ name: productName });
            await this.basket.delete({ product: _product });
            return {
                delete: true
            };
        }
        catch (e) {
            return {
                error: e.message
            };
        }
    }
    async changeCountProduct(product, count, token) {
        try {
            const stuff = await this.products.findOne({
                name: product.name
            });
            if (!stuff)
                throw new common_1.UnauthorizedException();
            const user = await this.users.findOne({
                where: { currentToken: token },
                select: ["id"]
            });
            if (!user)
                throw new common_1.UnauthorizedException();
            const _basket = await this.basket.findOne({
                userId: user.id,
                product: stuff
            });
            if (!_basket) {
                throw new common_1.UnauthorizedException();
            }
            ;
            this.basket.update(_basket.id, { productCount: count });
            return {
                change: true
            };
        }
        catch (e) {
            return {
                error: e.message
            };
        }
        ;
    }
    async addOrderData(orderData, token) {
        try {
            const user = await this.users.findOne({
                currentToken: token
            });
            if (!user) {
                throw new common_1.UnauthorizedException();
            }
            ;
            if (!this.validServ.checkOrderData(orderData)) {
                throw new Error("wrong properties");
            }
            ;
            const userOrderData = new users_order_data_entity_1.UsersOrderData();
            userOrderData.user = user;
            for (let e in orderData) {
                userOrderData[`${e}`] = orderData[`${e}`];
            };

            this.usersOrderRepo.save(userOrderData);
            return {
                addOrderData: true
            };
        }
        catch (e) {
            return {
                error: e.message
            };
        }
        ;
    }
    async userBasket(token) {
        try {
            const user = await this.users.findOne({
                currentToken: token
            });
            if (!user)
                throw new common_1.UnauthorizedException();
            const basket = await this.basket.findOne({
                userId: user.id
            });
            if (!basket)
                throw new common_1.UnauthorizedException();
            return true;
        }
        catch (e) {
            return {
                error: e.message
            };
        }
        ;
    }
    async updateDataOrder(jwt, method) {
        try {
            const user = await this.users.findOne({ currentToken: jwt });
            if (!user)
                throw new common_1.UnauthorizedException();
            const basket = await this.basket.findOne({ userId: user.id });
            if (!basket)
                throw new common_1.UnauthorizedException();
            const orderData = await this.usersOrderRepo.findOne({ user: user });
            if (!orderData)
                throw new common_1.UnauthorizedException();
            await this.usersOrderRepo.update(orderData, { paymant: method.paymant });
        }
        catch (e) {
            return {
                error: e.message
            };
        }
        ;
    }
};
BasketService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(basket_entity_1.Basket)),
    __param(3, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __param(4, (0, typeorm_1.InjectRepository)(products_entity_1.Products)),
    __param(5, (0, typeorm_1.InjectRepository)(users_order_data_entity_1.UsersOrderData)),
    __metadata("design:paramtypes", [stuff_service_1.StuffService,
        valid_order_data_form_service_1.ValidOrderDataFormService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BasketService);
exports.BasketService = BasketService;
;
//# sourceMappingURL=basket.service.js.map