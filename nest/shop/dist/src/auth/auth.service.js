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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../entities/users.entity");
const typeorm_2 = require("typeorm");
const hashPassword_1 = require("./hashPassword");
const uuid_1 = require("uuid");
const jsonwebtoken_1 = require("jsonwebtoken");
let AuthService = class AuthService {
    constructor(usersRepo) {
        this.usersRepo = usersRepo;
    }
    ;
    async isAdmin(req) {
        const userIsAdmin = async () => {
            const token = req["user"]["token"];
            const user = await this.usersRepo.findOne({ currentToken: token });
            return !user.isAdmin ? { userCan: false, userLog: true } : { userCan: true, userLog: true };
        };
        return !req.cookies.jwt ? { userCan: false, userLog: false } : await userIsAdmin();
    }
    ;
    checkRegisterData(user) {
        return (user.login.length != 0 && user.login.length < 25) && (user.password.length != 0 && user.password.length < 45);
    }
    ;
    async register(user) {
        try {
            const newUser = new users_entity_1.Users();
            if (!this.checkRegisterData(user))
                throw new Error("Invalid register data!");
            if (user.password !== user.r_password)
                throw new Error("Password is not same");
            newUser.login = user.login;
            user.email ? newUser.email = user.email : newUser.email = null;
            user.number ? newUser.number = user.number : newUser.number = null;
            const findUser = await this.usersRepo.findOne({ login: newUser.login });
            if (findUser) {
                return {
                    error: true,
                    addUser: false,
                    message: "Istnieje użytkownik o takim loginie."
                };
            }
            ;
            newUser.password = (0, hashPassword_1.hashPassword)(user.password);
            newUser.currentToken = null;
            await this.usersRepo.save(newUser);
            return {
                error: false,
                addUser: true
            };
        }
        catch (e) {
            return {
                error: e.message
            };
        }
        ;
    }
    ;
    async generateToken(user) {
        let currToken;
        let thatUser;
        do {
            currToken = (0, uuid_1.v4)();
            thatUser = await this.usersRepo.findOne({ currentToken: currToken });
        } while (!!thatUser);
        await this.usersRepo.update(user.id, { currentToken: currToken });
        return currToken;
    }
    ;
    createToken(token) {
        const payload = { id: token };
        const expiresIn = 60 * 60 * 24;
        const accessToken = (0, jsonwebtoken_1.sign)(payload, "HKy*&JHF8T8&*(7*&(*^GHFJGfdjky*(y9*68758Fhg*87T8FddsD7877TghJf8&^*76VBHf4", { expiresIn });
        return {
            expiresIn: +new Date() + expiresIn,
            accessToken
        };
    }
    ;
    async login(user, response) {
        try {
            const thatUser = await this.usersRepo.findOne({ login: user.login, password: (0, hashPassword_1.hashPassword)(user.password) });
            if (!thatUser) {
                throw new common_1.UnauthorizedException();
            }
            ;
            const currToken = this.createToken(await this.generateToken(thatUser));
            return response.cookie("jwt", currToken.accessToken, {
                domain: "localhost",
                secure: false,
                httpOnly: true
            })
                .json({
                isLog: true
            });
        }
        catch (e) {
            return response.json({
                error: e.message
            });
        }
        ;
    }
    ;
    async logout(token, res) {
        try {
            const _user = await this.usersRepo.findOne({ currentToken: token });
            if (!_user) {
                throw new common_1.UnauthorizedException();
            }
            ;
            _user.currentToken = null;
            await this.usersRepo.update(_user.id, _user);
            return res.clearCookie("jwt", {
                domain: "localhost",
                httpOnly: true,
                secure: false
            })
                .json({
                userCan: false,
                logout: true
            });
        }
        catch (e) {
            res.json({
                error: e.message
            });
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuthService);
exports.AuthService = AuthService;
;
//# sourceMappingURL=auth.service.js.map