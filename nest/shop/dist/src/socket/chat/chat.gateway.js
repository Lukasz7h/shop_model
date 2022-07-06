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
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const jsonwebtoken_1 = require("jsonwebtoken");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../../entities/users.entity");
const typeorm_2 = require("typeorm");
let ChatGateway = class ChatGateway {
    constructor(usersRepo) {
        this.usersRepo = usersRepo;
        this.users = {};
        this.canWrite = false;
    }
    getUniqCookie(cookies) {
        const arrayCookies = cookies.split("; ");
        const uniq = arrayCookies.find((e) => e.includes("uniq")).split("=")[1];
        return uniq;
    }
    async isAdmin(cookies) {
        if (!cookies)
            return false;
        const arrayCookies = cookies.split("; ");
        const jwt = arrayCookies.find((e) => e.includes("jwt"));
        if (jwt) {
            const jwtValue = jwt.split("=")[1];
            const token = (0, jsonwebtoken_1.decode)(jwtValue)["id"];
            const admin = await this.usersRepo.findOne({
                currentToken: token,
                isAdmin: true
            });
            return !!admin;
        }
        ;
        return false;
    }
    async handleConnection(socket) {
        const admin = await this.isAdmin(socket.handshake.headers.cookie);
        const uniqCookie = this.getUniqCookie(socket.handshake.headers.cookie);
        const user = this.users[`${uniqCookie}`];
        if (!user) {
            Object.defineProperty(this.users, `${uniqCookie}`, {
                value: { socketID: socket.id, admin, chat: [] },
                enumerable: true
            });
        }
        else {
            user.socketID = socket.id;
            user.admin = admin;
            var allChat = [];
            if (user.admin) {
                for (let user in this.users) {
                    allChat.push({ message: this.users[`${user}`].chat, uniq: user });
                }
                ;
            }
            else {
                allChat.push(user.chat);
            }
            ;
        }
        ;
        if (admin) {
            this.canWrite = true;
            this.adminSocketID = socket.id;
        }
        ;
        const send = { canWrite: this.canWrite };
        this.server.emit("connection", { canWrite: this.canWrite });
        if (allChat)
            socket.emit("message", { chat: { messages: allChat } });
    }
    handleDisconnect(client) {
        const uniqCookie = this.getUniqCookie(client.handshake.headers.cookie);
        const user = this.users[`${uniqCookie}`];
        setTimeout(() => {
            const user = this.users[`${uniqCookie}`];
            delete this.users[`${user}`];
            let flag = false;
            for (let e in this.users) {
                if (this.users[e].admin) {
                    flag = true;
                    break;
                }
                ;
            }
            ;
            this.canWrite = flag;
            if (!this.canWrite)
                this.server.emit("connection", { canWrite: this.canWrite });
        }, 4500);
    }
    handleMessage(data, client) {
        const uniqCookie = this.getUniqCookie(client.handshake.headers.cookie);
        const user = this.users[`${uniqCookie}`];
        function sendData(isAdmin) {
            this.server.sockets.fetchSockets()
                .then((e) => {
                e.forEach((socket) => {
                    if (!isAdmin && socket.id == this.adminSocketID) {
                        socket.emit("message", { uniq: uniqCookie, message: data }),
                            user.chat.push({ customer: true, message: data });
                    }
                    else if (isAdmin) {
                        const socketID = this.users[`${data["uniq"]}`].socketID;
                        if (socket.id == socketID) {
                            const user = this.users[`${data["uniq"]}`];
                            socket.emit("message", data['message']);
                            user.chat.push({ customer: false, message: data["message"] });
                        }
                        ;
                    }
                    ;
                });
            });
        }
        ;
        sendData.bind(this, user.admin)();
    }
    ;
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("message"),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleMessage", null);
ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(700),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map