import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ValidOrderDataFormService } from 'src/basket/valid-order-data-form/valid-order-data-form.service';
import { OrderDataDto } from 'src/dto/orderData.dto';

import { Basket } from 'src/entities/basket.entity';
import { Order } from 'src/entities/order.entity';

import { UserBought } from 'src/entities/user-bought.entity';
import { UsersOrderData } from 'src/entities/users-order-data.entity';

import { Users } from 'src/entities/users.entity';
import { MailService } from 'src/mail/mail.service';

import { StuffService } from 'src/stuff/stuff/stuff.service';
import { Like, Repository } from 'typeorm';

@Injectable()
export class UserDataService{
    constructor(
        private validServ: ValidOrderDataFormService,
        private mailService: MailService,

        private stuffService: StuffService,

        @InjectRepository(Basket) private basket: Repository<Basket>,
        @InjectRepository(Users) private users: Repository<Users>,

        @InjectRepository(UsersOrderData) private usersOrderDataRepo: Repository<UsersOrderData>,
        @InjectRepository(Order) private order: Repository<Order>,

        @InjectRepository(UserBought) private userBought: Repository<UserBought>
    ){}

    async addOrderData(orderData: OrderDataDto, token: string)
    {
        try
        {
            const user = await this.users.findOne({
                currentToken: token
            });
    
            if(!user) throw new UnauthorizedException();
            if(!this.validServ.checkOrderData(orderData)) throw new Error("wrong properties");

            const order = await this.usersOrderDataRepo.findOne({user: user});
            
            if(order)
            {
                await this.usersOrderDataRepo.update(order, orderData);
            }
            else
            {
                const userOrderData = new UsersOrderData();
                userOrderData.user = user;
    
                for(let e in orderData)
                {
                    userOrderData[`${e}`] = orderData[`${e}`];
                };
                this.usersOrderDataRepo.save(userOrderData);
            };

            return{
                addOrderData: true
            };
        }
        catch(e)
        {
            return{
                error: e.message
            };
        };
        
    }

    async updateDataOrder(jwt: string, method: {paymant: string})
    {
        try
        {
            const user = await this.users.findOne({currentToken: jwt});

            const basket = await this.basket.find({ where: {userId: user.id }, relations: ["product"]});
            if(!basket) throw new UnauthorizedException();

            const orderData = await this.usersOrderDataRepo.findOne({ user: user });
            if(!orderData) throw new UnauthorizedException();

            await this.usersOrderDataRepo.update(orderData, {paymant: method.paymant});
            await this.mailService.sendMail(orderData.email, "Twoje zamówienie z ::sklep", basket);

            let products: number[] = [];

            basket.forEach(async (e) => {

                products.push(e.product.id);
                await this.order.save({

                    productCount: e.productCount,
                    product: e.product,
                    user: user
                });

                await this.basket.delete(e);
            });

            const products_id: string = products.join(", ");
            const _userBought = await this.userBought.findOne({
                user: user
            });

            if(!_userBought)
            {
                await this.userBought.save({
                    products_id: products_id,
                    user: user
                });
            }
            else{
                const thatUser = await this.userBought.findOne(
                    {user: user},
                    {select: ["products_id"]}
                );

                const _products: string[] = thatUser.products_id.split(",");
                let newList: string = _products.join(",");

                products.forEach((value) => {
                    if(!_products.find(e => e == value.toString())) newList += ","+value;
                });

                if(_products.length !== newList.split(",").length)
                {
                    await this.userBought.update(_userBought, {
                        products_id: newList
                    });
                };
            };

            return{
                orderWell: true
            };
        }
        catch(e)
        {
            return{
                error: e.message
            };
        };
    }

    async getOrderData(jwt)
    {
        const user = await this.users.findOne({currentToken: jwt});
        return await this.usersOrderDataRepo.findOne({user: user},
        {
            select: [
                "name", "surname", "city",
                "post_code", "street", "house_number",
                "apartment_number", "phone", "email"
            ]
        });
    }

    async isBought(token: string)
    {
        try
        {
            const user = await this.users.findOne({
                currentToken: token
            });

            if(!user) throw new UnauthorizedException();

            return this.userBought.findOne({
                user: user
            },
            {
                select: ["products_id"]
            });
        }
        catch(e)
        {
            return{
                error: e.message
            };
        };
    }

    checkUserComment(issetComments: [{comment: string, count: number, id: number}], newComment: {comment: string, count: number, id: number})
    {
        let flag: boolean = true;

        for(let i=0; i<issetComments.length; i++)
        {
            if(issetComments[i].id === newComment.id)
            {
                flag = false;
                break;
            };
        };

        return flag;
    }

    async validComment(data: {comment: string, count: number, id: number}, userToken: string)
    {
        try
        {     
            const user = await this.users.findOne({currentToken: userToken});
            if(!user) throw new UnauthorizedException();

            if(
                !(data.comment.length > 15 && data.comment.length < 400)
                ||
                !(data.count > 0 && data.count < 6)
            )
            {
                throw new Error("Wrong data");
            };

            const comments = await this.userBought.findOne({
                user: user
            },
            {
                select: ["comment"]
            });

            let _comments = [];
            if(comments.comment)
            {
                console.log(comments);
                if(!this.checkUserComment(JSON.parse(comments.comment), data) )
                {
                    throw new Error("Isset comment");
                };

                const comm: string | {} = comments.comment;
                comm instanceof Array? _comments = comm: _comments.push(comm);

                this.stuffService.addStuffReview(data.id, data.count);
            };

            if(!comments.comment)
            {
                _comments.push(data);
                this.stuffService.addStuffReview(data.id, data.count);
            };

            _comments.push(data);
            await this.userBought.update({
                user: user
            },
            {
                comment: JSON.stringify(_comments)
            });

            return{
                addComment: true
            };
        }
        catch(e)
        {
            console.log(e);
            return{
                error: e.message
            };
        };
    }

    async getComments(id: string)
    {
       let comments = await this.userBought.find({
           where: {
                comment: Like('%"id":'+id+'%')
            },
           select: ["comment"]
       });

       if(!!comments)
       {
           var commentsForThatStuff = [];
           comments.find(e => {
                const comments = JSON.parse(e.comment);
                
                for(let data of comments)
                {
                    if(data.id == id)
                    {
                        var {comment, count} = data;
                        commentsForThatStuff .push({comment, count});
                        break;
                    };
                };
           });
       };

       return commentsForThatStuff? commentsForThatStuff: null;
    }
}