import { ValidOrderDataFormService } from 'src/basket/valid-order-data-form/valid-order-data-form.service';
import { OrderDataDto } from 'src/dto/orderData.dto';
import { Basket } from 'src/entities/basket.entity';
import { Order } from 'src/entities/order.entity';
import { UserBought } from 'src/entities/user-bought.entity';
import { UsersOrderData } from 'src/entities/users-order-data.entity';
import { Users } from 'src/entities/users.entity';
import { MailService } from 'src/mail/mail.service';
import { StuffService } from 'src/stuff/stuff/stuff.service';
import { Repository } from 'typeorm';
export declare class UserDataService {
    private validServ;
    private mailService;
    private stuffService;
    private basket;
    private users;
    private usersOrderDataRepo;
    private order;
    private userBought;
    constructor(validServ: ValidOrderDataFormService, mailService: MailService, stuffService: StuffService, basket: Repository<Basket>, users: Repository<Users>, usersOrderDataRepo: Repository<UsersOrderData>, order: Repository<Order>, userBought: Repository<UserBought>);
    addOrderData(orderData: OrderDataDto, token: string): Promise<{
        addOrderData: boolean;
        error?: undefined;
    } | {
        error: any;
        addOrderData?: undefined;
    }>;
    updateDataOrder(jwt: string, method: {
        paymant: string;
    }): Promise<{
        orderWell: boolean;
        error?: undefined;
    } | {
        error: any;
        orderWell?: undefined;
    }>;
    getOrderData(jwt: any): Promise<UsersOrderData>;
    isBought(token: string): Promise<UserBought | {
        error: any;
    }>;
    checkUserComment(issetComments: [{
        comment: string;
        count: number;
        id: number;
    }], newComment: {
        comment: string;
        count: number;
        id: number;
    }): boolean;
    validComment(data: {
        comment: string;
        count: number;
        id: number;
    }, userToken: string): Promise<{
        addComment: boolean;
        error?: undefined;
    } | {
        error: any;
        addComment?: undefined;
    }>;
    getComments(id: string): Promise<any[]>;
}
