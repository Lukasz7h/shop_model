import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { AppService } from './app.service';
import { StuffModule } from './stuff/stuff/stuff.module';

import { AuthModule } from './auth/auth.module';
import { BasketModule } from './basket/basket/basket.module';

import { ValidOrderDataFormService } from './basket/valid-order-data-form/valid-order-data-form.service';
import { MailModule } from './mail/mail.module';

import { UserDataModule } from './user-data/user-data.module';
import { SocketModule } from './socket/comment/socket.module';

import { ChatModule } from './socket/chat/chat.module';
import { UniqCookieController } from './uniq-cookie/uniq-cookie.controller';
import { UniqCookieService } from './uniq-cookie/uniq-cookie.service';

@Module({
  imports: [
    StuffModule,
    AuthModule,
    BasketModule,
    MailModule,
    UserDataModule,
    SocketModule,
    ChatModule
  ],
  controllers: [AppController, UniqCookieController],
  providers: [
    AppService,
    ValidOrderDataFormService,
    UniqCookieService
  ]
})
export class AppModule {}