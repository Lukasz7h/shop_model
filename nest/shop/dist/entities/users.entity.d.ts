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
}
