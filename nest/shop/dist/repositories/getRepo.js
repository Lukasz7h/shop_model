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
exports.GetRepo = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const child_stuff_entity_1 = require("../entities/child-stuff.entity");
const man_stuff_entity_1 = require("../entities/man-stuff.entity");
const woman_entity_1 = require("../entities/woman.entity");
const typeorm_2 = require("typeorm");
let GetRepo = class GetRepo {
    constructor(manStuff, womanStuff, childStuff) {
        this.manStuff = manStuff;
        this.womanStuff = womanStuff;
        this.childStuff = childStuff;
    }
    chooseGroup(group) {
        let repo;
        let newProduct;
        switch (group) {
            case "men":
                repo = this.manStuff;
                newProduct = new man_stuff_entity_1.ManStuff();
                break;
            case "woman":
                repo = this.womanStuff;
                newProduct = new woman_entity_1.WomanStuff();
                break;
            case "child":
                repo = this.childStuff;
                newProduct = new child_stuff_entity_1.ChildStuff();
                break;
        }
        ;
        return {
            repo,
            newProduct
        };
    }
    ;
};
GetRepo = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(man_stuff_entity_1.ManStuff)),
    __param(1, (0, typeorm_1.InjectRepository)(woman_entity_1.WomanStuff)),
    __param(2, (0, typeorm_1.InjectRepository)(child_stuff_entity_1.ChildStuff)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], GetRepo);
exports.GetRepo = GetRepo;
//# sourceMappingURL=getRepo.js.map