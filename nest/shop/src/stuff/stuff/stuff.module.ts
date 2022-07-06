import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StuffController } from './stuff.controller';
import { StuffService } from './stuff.service';

import { Users } from 'src/entities/users.entity';
import { Products } from 'src/entities/products.entity';

import { Basket } from 'src/entities/basket.entity';
import { ProductsDetails } from 'src/entities/products-details.entity';

import { UsersOrderData } from 'src/entities/users-order-data.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature( [Users, Products, Basket, ProductsDetails, UsersOrderData])
  ],
  controllers: [StuffController],
  providers: [StuffService]
})
export class StuffModule {}
