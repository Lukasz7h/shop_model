import { Basket } from 'src/entities/basket.entity';
import { UsersOrderData } from 'src/entities/users-order-data.entity';
import { Repository } from 'typeorm';
import { ValidOrderDataFormService } from '../valid-order-data-form/valid-order-data-form.service';
import { Users } from 'src/entities/users.entity';
import { Products } from 'src/entities/products.entity';
import { MailService } from 'src/mail/mail.service';
import { Order } from 'src/entities/order.entity';
import { UserBought } from 'src/entities/user-bought.entity';
export declare class BasketService {
    private validServ;
    private mailService;
    private basket;
    private users;
    private products;
    private usersOrderDataRepo;
    private order;
    private userBought;
    updateDataOrder(jwt: any, method: any): void;
    constructor(validServ: ValidOrderDataFormService, mailService: MailService, basket: Repository<Basket>, users: Repository<Users>, products: Repository<Products>, usersOrderDataRepo: Repository<UsersOrderData>, order: Repository<Order>, userBought: Repository<UserBought>);
    addProduct(product: any, token: string): Promise<{
        error: any;
    }>;
    getProducts(jwt: string): Promise<any>;
    removeFromBasket(productName: string, type: string, token: string): Promise<{
        delete: boolean;
        error?: undefined;
    } | {
        error: any;
        delete?: undefined;
    }>;
    changeCountProduct(product: any, count: number, token: string): Promise<{
        change: boolean;
        error?: undefined;
    } | {
        error: any;
        change?: undefined;
    }>;
    userBasket(token: string): Promise<{
        isNotEmpty: boolean;
    } | {
        error: string;
    }>;
    hasBasketAndOrderData(jwt: string): Promise<{
        can: boolean;
        error?: undefined;
    } | {
        error: any;
        can?: undefined;
    }>;
}
