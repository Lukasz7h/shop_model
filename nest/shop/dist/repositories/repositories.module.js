"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoriesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const child_stuff_entity_1 = require("../entities/child-stuff.entity");
const man_stuff_entity_1 = require("../entities/man-stuff.entity");
const woman_entity_1 = require("../entities/woman.entity");
const getRepo_1 = require("./getRepo");
let RepositoriesModule = class RepositoriesModule {
};
RepositoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(),
            typeorm_1.TypeOrmModule.forFeature([man_stuff_entity_1.ManStuff, woman_entity_1.WomanStuff, child_stuff_entity_1.ChildStuff])
        ],
        providers: [getRepo_1.GetRepo]
    })
], RepositoriesModule);
exports.RepositoriesModule = RepositoriesModule;
//# sourceMappingURL=repositories.module.js.map