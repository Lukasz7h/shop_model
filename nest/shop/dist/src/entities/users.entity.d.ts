import { Order } from "./order.entity";
import { UserBought } from "./user-bought.entity";
import { UsersOrderData } from "./users-order-data.entity";
export declare class Users {
    id: string;
    login: string;
    email: string;
    number: number;
    password: string;
    currentToken: string;
    isAdmin: boolean;
    orderData: UsersOrderData;
    orders: Order[];
    bought: UserBought[];
}
