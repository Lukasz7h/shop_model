"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const stuff_service_1 = require("./stuff.service");
describe('StuffService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [stuff_service_1.StuffService],
        }).compile();
        service = module.get(stuff_service_1.StuffService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=stuff.service.spec.js.map