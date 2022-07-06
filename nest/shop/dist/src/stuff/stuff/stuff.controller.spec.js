"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const stuff_controller_1 = require("./stuff.controller");
describe('StuffController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [stuff_controller_1.StuffController],
        }).compile();
        controller = module.get(stuff_controller_1.StuffController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=stuff.controller.spec.js.map