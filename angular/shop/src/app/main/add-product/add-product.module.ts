import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProductComponent } from './add-product.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AddProductModule { }
