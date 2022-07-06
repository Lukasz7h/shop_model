import { Request } from 'express';
import { BasketService } from './basket.service';
export declare class BasketController {
    private basketService;
    constructor(basketService: BasketService);
    addToBasket(product: any, req: Request): void;
    changeBasket(productData: any, req: Request): Promise<{
        change: boolean;
        error?: undefined;
    } | {
        error: any;
        change?: undefined;
    }>;
    getProducts(req: Request): Promise<any>;
    removeFromBasket(req: Request, productName: string, type: string): Promise<{
        delete: boolean;
        error?: undefined;
    } | {
        error: any;
        delete?: undefined;
    }>;
    cors(): void;
    addOrderData(data: any, req: Request): Promise<{
        addOrderData: boolean;
        error?: undefined;
    } | {
        error: any;
        addOrderData?: undefined;
    }>;
    options(): void;
    isBasketEmpty(req: Request): Promise<boolean | {
        error: string;
    }>;
    updatePaymantMethod(method: any, req: Request): Promise<{
        error: any;
    }>;
    updatePaymant(): void;
}
