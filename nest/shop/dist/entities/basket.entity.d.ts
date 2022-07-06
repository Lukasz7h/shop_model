import { Products } from "./products.entity";
export declare class Basket {
    id: number;
    userId: string;
    group: string;
    product: Products;
    productCount: number;
}
