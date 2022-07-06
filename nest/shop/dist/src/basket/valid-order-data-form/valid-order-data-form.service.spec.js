"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const valid_order_data_form_service_1 = require("./valid-order-data-form.service");
describe('ValidOrderDataFormService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [valid_order_data_form_service_1.ValidOrderDataFormService],
        }).compile();
        service = module.get(valid_order_data_form_service_1.ValidOrderDataFormService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=valid-order-data-form.service.spec.js.map