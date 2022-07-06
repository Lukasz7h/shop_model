import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthGuard } from './main/add-product/guard/auth-guard';
import { LoginGuard } from './login-panel/guard/auth-guard';

import { PaymantGuard } from './basket/paymant-method/guards/paymant-guard';
import { InitiaViewModule } from './start/initial-view/initia-view.module';

import { GroupModule } from './group/group.module';
import { HttpClientModule } from '@angular/common/http';

import { MainModule } from './main/main.module';
import { DetailModule } from './main/products/detail/detail.module';

import { AddProductModule } from './main/add-product/add-product.module';
import { LoginModule } from './login-panel/login.module';

import { AddAccountModule } from './add-account/add-account.module';
import { DataOfOrderModule } from './basket/data-of-order/data-of-order.module';

import { PaymantMethodModule } from './basket/paymant-method/paymant-method.module';
import { CommonModule } from '@angular/common';

import { BasketModule } from './basket/basket.module';
import { ReviewModule } from './main/products/detail/review/review.module';
import { ContactComponent } from './contact/contact.component';
import { StatuteComponent } from './statute/statute.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    StatuteComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    InitiaViewModule,
    GroupModule,
    MainModule,
    DetailModule,
    AddProductModule,
    LoginModule,
    BasketModule,
    AddAccountModule,
    DataOfOrderModule,
    PaymantMethodModule,
    ReviewModule
  ],
  providers: [AuthGuard, LoginGuard, PaymantGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}