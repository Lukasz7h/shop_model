import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';

import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Users } from 'src/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([Users])
  ],
  providers: [
    ChatGateway,
    ChatService
  ]
})
export class ChatModule {}
