import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Basket } from 'src/entities/basket.entity';
import { UsersOrderData } from 'src/entities/users-order-data.entity';

import { getConnection, Repository } from 'typeorm';
import { ValidOrderDataFormService } from '../valid-order-data-form/valid-order-data-form.service';

import { OrderDataDto } from 'src/dto/orderData.dto';
import { Users } from 'src/entities/users.entity';

import { Products } from 'src/entities/products.entity';
import { MailService } from 'src/mail/mail.service';

import { Order } from 'src/entities/order.entity';
import { UserBought } from 'src/entities/user-bought.entity';

@Injectable()
export class BasketService {
    updateDataOrder(jwt: any, method: any) {
        throw new Error('Method not implemented.');
    }

    constructor(
        private validServ: ValidOrderDataFormService,
        private mailService: MailService,

        @InjectRepository(Basket) private basket: Repository<Basket>,
        @InjectRepository(Users) private users: Repository<Users>,

        @InjectRepository(Products) private products: Repository<Products>,
        @InjectRepository(UsersOrderData) private usersOrderDataRepo: Repository<UsersOrderData>,

        @InjectRepository(Order) private order: Repository<Order>,
        @InjectRepository(UserBought) private userBought: Repository<UserBought>
    ){}

    // dodajemy produkty do koszyka
    async addProduct(product, token: string)
    {
        const _product = JSON.parse(product["product"]).data;
        try
        {
            const stuff = await this.products.findOne({id: _product.id});
            if(!stuff) throw new UnauthorizedException();

            const user = await this.users.findOne({currentToken: token});
            if(!user) throw new UnauthorizedException();

            const addToBasket = new Basket();
            const count = JSON.parse(product["product"]).count;

            const size = JSON.parse(product["product"]).size;

            addToBasket.userId = user.id;
            addToBasket.productCount = count;

            addToBasket.group = _product.type;
            addToBasket.product = stuff;
            
            addToBasket.size = size;

            if(count == 0 || count < 0) throw new Error("Wrong count");

            const basketStuff = await this.basket.findOne({
                product: stuff
            });

            await this.basket.save(addToBasket);
        }
        catch(e)
        {
            return{
                error: e.message
            };
        };
        
    }

    // pobieramy produkty z koszyka
    async getProducts(jwt: string)
    {
        try
        {
            const user = await this.users.findOne({currentToken: jwt});

            if(!user){
                throw new Error(JSON.stringify({error: true, type: "not_found"}));
            };

            const userID = user.id;
            const relations = await this.basket.find({where: {
                userId: userID
            },
            relations: ["product"],
            select: [
                "productCount",
                "size"
            ]
            });

            for(let e in relations)
            {
                if(relations[e] === null) delete relations[e];
                if(typeof relations[e] === "object")
                {
                    for(let x in relations[e])
                    {
                        if(relations[e][x] !== null)
                        {
                            if(relations[e][x]['id']) delete relations[e][x]['id'];
                            if(relations[e][x] === null || !relations[e][x]) delete relations[e][x];
                        }
                        else
                        {
                            delete relations[e][x];
                        };
                    };
                };
            };

            return relations;
        }
        catch(e)
        {
            return e.message;
        };
    }

    // usuwanie produktów z koszyka
    async removeFromBasket(productName: string, type: string, token: string)
    {
        try
        {
            const user = await this.users.findOne({currentToken: token});

            if(!user) throw new UnauthorizedException();

            const _product = await this.products.findOne({name: productName});

            await this.basket.delete({product: _product});
            return{
                delete: true
            };
        }
        catch(e)
        {
            return{
                error: e.message
            };
        };
    }

    // zmieniamy ilość danego produktu w koszyku
    async changeCountProduct(product, count: number, token: string)
    {
        try
        {
            const stuff = await this.products.findOne({
                name: product.name
            });

            if(!stuff) throw new UnauthorizedException();

            const user = await this.users.findOne({
                where: { currentToken: token},
                select: ["id"]
            });

            if(!user) throw new UnauthorizedException();

            const _basket = await this.basket.findOne({
                userId: user.id,
                product: stuff
            });

            if(!_basket)
            {
                throw new UnauthorizedException();
            };

            if(count == 0 || count < 0) throw new Error("Wrong count");

            this.basket.update(_basket.id, {productCount: count});
            return {
                change: true
            };
        }
        catch(e)
        {
            return{
                error: e.message
            };
        };
    }

    // zwracamy informacje o tym czy koszyk jest pusty
    async userBasket(token: string): Promise<{isNotEmpty: boolean} | {error: string}>
    {
        try
        {
            const user = await this.users.findOne({
                currentToken: token
            });
            if(!user) throw new UnauthorizedException();

            const basket = await this.basket.findOne({
                userId: user.id
            });
            if(!basket) throw new UnauthorizedException();

            return{
                isNotEmpty: true
            };
        }
        catch(e)
        {
            return{
                error: e.message
            };
        };
    }

    // sprawdzamy czy użytkownik posiada coś w koszyku i czy ma zapisane dane dotyczace dostawy
    async hasBasketAndOrderData(jwt: string)
    {
        try
        {
            const user = await this.users.findOne({currentToken: jwt});

            const basket = await this.basket.findOne({ userId: user.id });
            if(!basket) throw new UnauthorizedException();

            const dataOrder = await this.usersOrderDataRepo.findOne({ user: user});
            if(!dataOrder) throw new UnauthorizedException();

            return{
                can: true
            };
        }
        catch(e)
        {
            return{
                error: e.message
            };
        };
    }

};