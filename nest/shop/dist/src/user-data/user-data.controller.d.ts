import { UserDataService } from './user-data.service';
import { Request } from 'express';
export declare class UserDataController {
    private userDataService;
    constructor(userDataService: UserDataService);
    addOrderData(data: any, req: Request): Promise<{
        addOrderData: boolean;
        error?: undefined;
    } | {
        error: any;
        addOrderData?: undefined;
    }>;
    getOrderData(req: Request): Promise<import("../entities/users-order-data.entity").UsersOrderData>;
    isBought(req: Request): Promise<import("../entities/users-order-data.entity").UsersOrderData>;
    updatePaymantMethod(method: any, req: Request): Promise<{
        orderWell: boolean;
        error?: undefined;
    } | {
        error: any;
        orderWell?: undefined;
    }>;
    updatePayman(): void;
    userBought(req: Request): Promise<import("../entities/user-bought.entity").UserBought | {
        error: any;
    }>;
    addComment(commentData: any, req: Request): Promise<{
        addComment: boolean;
        error?: undefined;
    } | {
        error: any;
        addComment?: undefined;
    }>;
    updatePaymant(): void;
    getComments(id: string): Promise<any[]>;
}
