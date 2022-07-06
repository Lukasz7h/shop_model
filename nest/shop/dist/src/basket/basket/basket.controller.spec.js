"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const basket_controller_1 = require("./basket.controller");
describe('BasketController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [basket_controller_1.BasketController],
        }).compile();
        controller = module.get(basket_controller_1.BasketController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=basket.controller.spec.js.map