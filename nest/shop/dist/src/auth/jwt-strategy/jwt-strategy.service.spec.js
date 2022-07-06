"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const jwt_strategy_service_1 = require("./jwt-strategy.service");
describe('JwtStrategyService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [jwt_strategy_service_1.JwtStrategyService],
        }).compile();
        service = module.get(jwt_strategy_service_1.JwtStrategyService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=jwt-strategy.service.spec.js.map