"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidOrderDataFormService = void 0;
const common_1 = require("@nestjs/common");
let ValidOrderDataFormService = class ValidOrderDataFormService {
    constructor() {
        this.checkLen = (task, max = null) => max === null ? task.length > 2 : task.length > 0 && task.length < max;
        this.valuesSettings = {
            name: (task) => { return this.checkLen(task) ? typeof task.toString() === "string" : false; },
            surname: (task) => this.checkLen(task),
            city: (city) => { return this.checkLen(city) ? typeof city.toString() === "string" : false; },
            postcode: (code) => {
                return !!/[0-9]{2,2}-[0-9]{3,3}/.exec(code);
            },
            street: (task) => this.checkLen(task),
            house_number: (h_number) => {
                const isNum = parseInt(h_number);
                return !this.checkLen(h_number, 0) && !isNaN(isNum);
            },
            apartment_number: (_number) => {
                const apart_num = _number.toString();
                return apart_num.length > 0 ? !isNaN(parseInt(apart_num)) : true;
            },
            phone: (_number) => {
                const phone_num = _number.toString();
                return phone_num.length > 0 ? !!/[0-9]{9,9}/.exec(phone_num) : false;
            },
            email: (email) => {
                return this.checkLen(email, 128) ? !!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]/.exec(email) : false;
            }
        };
    }
    checkOrderData(form) {
        let flag = true;
        for (let e in form) {
            const method = this.valuesSettings[`${e}`];
            if (!method(form[`${e}`]))
                flag = false;
        }
        ;
        return flag;
    }
};
ValidOrderDataFormService = __decorate([
    (0, common_1.Injectable)()
], ValidOrderDataFormService);
exports.ValidOrderDataFormService = ValidOrderDataFormService;
//# sourceMappingURL=valid-order-data-form.service.js.map