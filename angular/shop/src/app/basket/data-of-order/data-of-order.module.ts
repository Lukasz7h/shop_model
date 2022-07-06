import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataOfOrderComponent } from './data-of-order.component';
import { ReactiveFormsModule } from '@angular/forms';

import { BasketIsEmpty } from './guard/basketIsNotEmpty.guard';

@NgModule({
  declarations: [
    DataOfOrderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    BasketIsEmpty
  ]
})
export class DataOfOrderModule { }
