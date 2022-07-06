"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const basket_service_1 = require("./basket.service");
describe('BasketService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [basket_service_1.BasketService],
        }).compile();
        service = module.get(basket_service_1.BasketService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=basket.service.spec.js.map