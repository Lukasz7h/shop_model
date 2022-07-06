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
exports.StuffService = exports.photoWell = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const group_1 = require("./group");
const users_entity_1 = require("../../entities/users.entity");
const fileServ_1 = require("../fileCheck/fileServ");
const products_entity_1 = require("../../entities/products.entity");
const products_details_entity_1 = require("../../entities/products-details.entity");
exports.photoWell = { flag: true };
let StuffService = class StuffService {
    constructor(products, productsDetails, users) {
        this.products = products;
        this.productsDetails = productsDetails;
        this.users = users;
    }
    ;
    getSeason(season) {
        return { spring: "Wiosna", summer: "Lato", fall: "Jesień", winter: "Zima" }[season];
    }
    ;
    getBodyPart(part) {
        return { head: "Głowa", corpus: "Korpus", legs: "Nogi", feet: "Stopy" }[part];
    }
    ;
    async getStuffBy(dataFind, repo, data) {
        return await repo.find({
            where: {
                season: data.season,
                bodyPart: data.bodyPart,
                price: (0, typeorm_2.Between)(dataFind['prop']['price'][0], dataFind['prop']['price'][1]),
                name: (0, typeorm_2.Like)(`%${dataFind['prop']['search']}%`)
            }
        });
    }
    ;
    async getStuff(season, group, bodyPart, dataFind = null) {
        const _season = this.getSeason(season);
        const _bodyPart = this.getBodyPart(bodyPart);
        if (!_season) {
            return {
                err: "wrong season"
            };
        }
        ;
        if (!_bodyPart) {
            return {
                err: "wrong part"
            };
        }
        ;
        if (!dataFind) {
            var res = await this.products.find({
                where: { season: _season, bodyPart: _bodyPart }
            });
        }
        else {
            var res = await this.products.find({
                where: {
                    season: _season,
                    bodyPart: _bodyPart,
                    price: (0, typeorm_2.Between)(dataFind['prop']['price'][0], dataFind['prop']['price'][1]),
                    name: (0, typeorm_2.Like)(`%${dataFind['prop']['search']}%`)
                }
            });
        }
        ;
        let fil = [];
        res.forEach((e) => {
            fil.push({ id: e.id, name: e.name, price: e.price });
        });
        return fil;
    }
    ;
    async getDetailsOfProduct(id) {
        const product = await this.products.findOne({
            where: { id: id },
            relations: ["detail"]
        });
        let res = product;
        if (product.photosName) {
            res.getFiles = true;
            const filesCount = product.photosName.split(", ").length;
            res.filesCount = filesCount;
        };
        return res;
    }
    ;
    async getPhotosOfProduct(id, i, res) {
        const product = await this.products.findOne({
            where: { id: id },
            select: ["photosName"]
        });
        const photosDir = product.photosName;
        const photosArr = photosDir.split(", ");
        return res.sendFile(photosArr[i], {
            root: "./photos"
        });
    }
    checkSpecification(specification) {
        return specification.filter(e => e.name !== "" && e.value !== "");
    }
    ;
    async addStuff(stuff, photos, token) {
        try {
            const user = await this.users.findOne({ currentToken: token });
            if (!user || !user.isAdmin) {
                throw new common_1.UnauthorizedException();
            }
            const hasFiles = "files" in photos ? (0, fileServ_1.checkFiles)(photos) : false;
            if (hasFiles) {
                var photosArray = (0, fileServ_1.getPhotos)(photos);
                var productPhotos = photosArray.join(", ");
            }
            ;
            let errLen;
            if (errLen = stuff.productName.length < 7 ?
                (stuff.productDescription.length < 40 ? ["productName", "productDescription"] : "productName") :
                (stuff.productDescription.length < 40 ? "productDescription" : false)) {
                if (errLen instanceof Array) {
                    throw new Error(`{type: len, errLen: [${errLen}]}`);
                }
                ;
                throw new Error(`{type: len, errLen: ${errLen}}`);
            }
            else if (stuff.productPrice < 1) {
                throw new Error("type: price, errPrice: productPrice");
            }
            else {
                const group = (0, group_1.thatGroup)(stuff.productGroup);
                let specification = this.checkSpecification(stuff.productSpecification);
                specification = specification.length === 0 ? null : JSON.stringify(specification);
                const newProduct = new products_entity_1.Products();
                newProduct.name = stuff.productName;
                newProduct.season = stuff.productSeason;
                newProduct.price = stuff.productPrice;
                newProduct.bodyPart = stuff.productBodyPart;
                newProduct.photosName = productPhotos ? productPhotos : null;
                newProduct.type = group;
                await this.products.save(newProduct);
                const stuffDetails = new products_details_entity_1.ProductsDetails();
                stuffDetails.description = stuff.productDescription;
                stuffDetails.specification = specification;
                await this.productsDetails.save(stuffDetails);
                newProduct.detail = stuffDetails;
                await this.products.save(newProduct);
                return {
                    add: true
                };
            }
            ;
        }
        catch (e) {
            return {
                error: e.message
            };
        }
        ;
    }
    ;
};
StuffService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(products_entity_1.Products)),
    __param(1, (0, typeorm_1.InjectRepository)(products_details_entity_1.ProductsDetails)),
    __param(2, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], StuffService);
exports.StuffService = StuffService;
//# sourceMappingURL=stuff.service.js.map