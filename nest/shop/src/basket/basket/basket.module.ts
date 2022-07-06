import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategyService } from 'src/auth/jwt-strategy/jwt-strategy.service';
import { Basket } from 'src/entities/basket.entity';

import { ProductsDetails } from 'src/entities/products-details.entity';
import { Products } from 'src/entities/products.entity';

import { UsersOrderData } from 'src/entities/users-order-data.entity';
import { Users } from 'src/entities/users.entity';

import { MailService } from 'src/mail/mail.service';
import { StuffService } from 'src/stuff/stuff/stuff.service';

import { ValidOrderDataFormService } from '../valid-order-data-form/valid-order-data-form.service';
import { BasketController } from './basket.controller';

import { BasketService } from './basket.service';
import { Order } from 'src/entities/order.entity';

import { UserBought } from 'src/entities/user-bought.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([
      Basket,
      Users,
      UsersOrderData,
      Products,
      ProductsDetails,
      Order,
      UserBought
    ])
  ],
  controllers: [BasketController],
  providers: [
    BasketService,
    StuffService,
    JwtStrategyService,
    ValidOrderDataFormService,
    MailService
  ]
})
export class BasketModule {}
