import { Basket } from 'src/entities/basket.entity';
import { UsersOrderData } from 'src/entities/users-order-data.entity';
import { StuffService } from 'src/stuff/stuff/stuff.service';
import { Repository } from 'typeorm';
import { ValidOrderDataFormService } from '../valid-order-data-form/valid-order-data-form.service';
import { OrderDataDto } from 'src/dto/orderData.dto';
import { Users } from 'src/entities/users.entity';
import { Products } from 'src/entities/products.entity';
export declare class BasketService {
    private stuffService;
    private validServ;
    private basket;
    private users;
    private products;
    private usersOrderRepo;
    constructor(stuffService: StuffService, validServ: ValidOrderDataFormService, basket: Repository<Basket>, users: Repository<Users>, products: Repository<Products>, usersOrderRepo: Repository<UsersOrderData>);
    addProduct(product: any, token: string): Promise<{
        updateBasket: boolean;
        error?: undefined;
    } | {
        error: any;
        updateBasket?: undefined;
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
    addOrderData(orderData: OrderDataDto, token: string): Promise<{
        addOrderData: boolean;
        error?: undefined;
    } | {
        error: any;
        addOrderData?: undefined;
    }>;
    userBasket(token: string): Promise<boolean | {
        error: string;
    }>;
    updateDataOrder(jwt: string, method: {
        paymant: string;
    }): Promise<{
        error: any;
    }>;
}
