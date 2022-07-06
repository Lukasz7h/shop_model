import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddAccountComponent } from './add-account.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddAccountComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AddAccountModule { }
