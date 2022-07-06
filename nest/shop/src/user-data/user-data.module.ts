import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ValidOrderDataFormService } from 'src/basket/valid-order-data-form/valid-order-data-form.service';
import { Basket } from 'src/entities/basket.entity';

import { Order } from 'src/entities/order.entity';
import { ProductsDetails } from 'src/entities/products-details.entity';

import { Products } from 'src/entities/products.entity';
import { UserBought } from 'src/entities/user-bought.entity';

import { UsersOrderData } from 'src/entities/users-order-data.entity';
import { Users } from 'src/entities/users.entity';

import { MailService } from 'src/mail/mail.service';
import { StuffService } from 'src/stuff/stuff/stuff.service';

import { UserDataController } from './user-data.controller';
import { UserDataService } from './user-data.service';

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
  controllers: [UserDataController],
  providers: [
    UserDataService,
    ValidOrderDataFormService,
    MailService,
    StuffService
  ]
})
export class UserDataModule {}