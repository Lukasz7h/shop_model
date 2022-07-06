import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymantMethodComponent } from './paymant-method.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PaymantMethodComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PaymantMethodModule { }
