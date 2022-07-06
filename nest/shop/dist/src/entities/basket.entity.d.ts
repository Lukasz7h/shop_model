import { Products } from "./products.entity";
export declare class Basket {
    id: number;
    userId: string;
    group: string;
    size: string;
    product: Products;
    productCount: number;
}
