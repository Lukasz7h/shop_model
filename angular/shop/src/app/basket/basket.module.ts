import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasketComponent } from './basket.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    BasketComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class BasketModule { }
