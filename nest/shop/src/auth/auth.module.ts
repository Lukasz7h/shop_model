import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { AuthController } from './auth.controller';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategyService],
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([Users])
  ]
})
export class AuthModule {}
