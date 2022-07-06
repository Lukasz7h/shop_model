import { OrderDataDto } from 'src/dto/orderData.dto';
export declare class ValidOrderDataFormService {
    checkLen: (task: string, max?: any) => boolean;
    valuesSettings: {
        name: (task: string) => boolean;
        surname: (task: string) => boolean;
        city: (city: string) => boolean;
        postcode: (code: string) => boolean;
        street: (task: string) => boolean;
        house_number: (h_number: string) => boolean;
        apartment_number: (_number: string) => boolean;
        phone: (_number: number) => boolean;
        email: (email: string) => boolean;
    };
    checkOrderData(form: OrderDataDto): boolean;
}
