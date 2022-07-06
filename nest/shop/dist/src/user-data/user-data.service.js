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
exports.UserDataService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const valid_order_data_form_service_1 = require("../basket/valid-order-data-form/valid-order-data-form.service");
const basket_entity_1 = require("../entities/basket.entity");
const order_entity_1 = require("../entities/order.entity");
const user_bought_entity_1 = require("../entities/user-bought.entity");
const users_order_data_entity_1 = require("../entities/users-order-data.entity");
const users_entity_1 = require("../entities/users.entity");
const mail_service_1 = require("../mail/mail.service");
const stuff_service_1 = require("../stuff/stuff/stuff.service");
const typeorm_2 = require("typeorm");
let UserDataService = class UserDataService {
    constructor(validServ, mailService, stuffService, basket, users, usersOrderDataRepo, order, userBought) {
        this.validServ = validServ;
        this.mailService = mailService;
        this.stuffService = stuffService;
        this.basket = basket;
        this.users = users;
        this.usersOrderDataRepo = usersOrderDataRepo;
        this.order = order;
        this.userBought = userBought;
    }
    async addOrderData(orderData, token) {
        try {
            const user = await this.users.findOne({
                currentToken: token
            });
            if (!user)
                throw new common_1.UnauthorizedException();
            if (!this.validServ.checkOrderData(orderData))
                throw new Error("wrong properties");
            const order = await this.usersOrderDataRepo.findOne({ user: user });
            if (order) {
                await this.usersOrderDataRepo.update(order, orderData);
            }
            else {
                const userOrderData = new users_order_data_entity_1.UsersOrderData();
                userOrderData.user = user;
                for (let e in orderData) {
                    userOrderData[`${e}`] = orderData[`${e}`];
                }
                ;
                this.usersOrderDataRepo.save(userOrderData);
            }
            ;
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
    async updateDataOrder(jwt, method) {
        try {
            const user = await this.users.findOne({ currentToken: jwt });
            const basket = await this.basket.find({ where: { userId: user.id }, relations: ["product"] });
            if (!basket)
                throw new common_1.UnauthorizedException();
            const orderData = await this.usersOrderDataRepo.findOne({ user: user });
            if (!orderData)
                throw new common_1.UnauthorizedException();
            await this.usersOrderDataRepo.update(orderData, { paymant: method.paymant });
            await this.mailService.sendMail(orderData.email, "Twoje zamówienie z ::sklep", basket);
            let products = [];
            basket.forEach(async (e) => {
                products.push(e.product.id);
                await this.order.save({
                    productCount: e.productCount,
                    product: e.product,
                    user: user
                });
                await this.basket.delete(e);
            });
            const products_id = products.join(", ");
            const _userBought = await this.userBought.findOne({
                user: user
            });
            if (!_userBought) {
                await this.userBought.save({
                    products_id: products_id,
                    user: user
                });
            }
            else {
                const thatUser = await this.userBought.findOne({ user: user }, { select: ["products_id"] });
                const _products = thatUser.products_id.split(",");
                let newList = _products.join(",");
                products.forEach((value) => {
                    if (!_products.find(e => e == value.toString()))
                        newList += "," + value;
                });
                if (_products.length !== newList.split(",").length) {
                    await this.userBought.update(_userBought, {
                        products_id: newList
                    });
                }
                ;
            }
            ;
            return {
                orderWell: true
            };
        }
        catch (e) {
            return {
                error: e.message
            };
        }
        ;
    }
    async getOrderData(jwt) {
        const user = await this.users.findOne({ currentToken: jwt });
        return await this.usersOrderDataRepo.findOne({ user: user }, {
            select: [
                "name", "surname", "city",
                "post_code", "street", "house_number",
                "apartment_number", "phone", "email"
            ]
        });
    }
    async isBought(token) {
        try {
            const user = await this.users.findOne({
                currentToken: token
            });
            if (!user)
                throw new common_1.UnauthorizedException();
            return this.userBought.findOne({
                user: user
            }, {
                select: ["products_id"]
            });
        }
        catch (e) {
            return {
                error: e.message
            };
        }
        ;
    }
    checkUserComment(issetComments, newComment) {
        let flag = true;
        for (let i = 0; i < issetComments.length; i++) {
            if (issetComments[i].id === newComment.id) {
                flag = false;
                break;
            }
            ;
        }
        ;
        return flag;
    }
    async validComment(data, userToken) {
        try {
            const user = await this.users.findOne({ currentToken: userToken });
            if (!user)
                throw new common_1.UnauthorizedException();
            if (!(data.comment.length > 15 && data.comment.length < 400)
                ||
                    !(data.count > 0 && data.count < 6)) {
                throw new Error("Wrong data");
            }
            ;
            const comments = await this.userBought.findOne({
                user: user
            }, {
                select: ["comment"]
            });
            let _comments = [];
            if (comments.comment) {
                console.log(comments);
                if (!this.checkUserComment(JSON.parse(comments.comment), data)) {
                    throw new Error("Isset comment");
                }
                ;
                const comm = comments.comment;
                comm instanceof Array ? _comments = comm : _comments.push(comm);
                this.stuffService.addStuffReview(data.id, data.count);
            }
            ;
            if (!comments.comment) {
                _comments.push(data);
                this.stuffService.addStuffReview(data.id, data.count);
            }
            ;
            _comments.push(data);
            await this.userBought.update({
                user: user
            }, {
                comment: JSON.stringify(_comments)
            });
            return {
                addComment: true
            };
        }
        catch (e) {
            console.log(e);
            return {
                error: e.message
            };
        }
        ;
    }
    async getComments(id) {
        let comments = await this.userBought.find({
            where: {
                comment: (0, typeorm_2.Like)('%"id":' + id + '%')
            },
            select: ["comment"]
        });
        if (!!comments) {
            var commentsForThatStuff = [];
            comments.find(e => {
                const comments = JSON.parse(e.comment);
                for (let data of comments) {
                    if (data.id == id) {
                        var { comment, count } = data;
                        commentsForThatStuff.push({ comment, count });
                        break;
                    }
                    ;
                }
                ;
            });
        }
        ;
        return commentsForThatStuff ? commentsForThatStuff : null;
    }
};
UserDataService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_1.InjectRepository)(basket_entity_1.Basket)),
    __param(4, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __param(5, (0, typeorm_1.InjectRepository)(users_order_data_entity_1.UsersOrderData)),
    __param(6, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(7, (0, typeorm_1.InjectRepository)(user_bought_entity_1.UserBought)),
    __metadata("design:paramtypes", [valid_order_data_form_service_1.ValidOrderDataFormService,
        mail_service_1.MailService,
        stuff_service_1.StuffService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserDataService);
exports.UserDataService = UserDataService;
//# sourceMappingURL=user-data.service.js.map