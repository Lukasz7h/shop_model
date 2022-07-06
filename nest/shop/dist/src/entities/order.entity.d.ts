import { Products } from "./products.entity";
import { Users } from "./users.entity";
export declare class Order {
    id: string;
    product: Products;
    user: Users;
    productCount: number;
}
