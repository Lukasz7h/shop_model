import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPanelComponent } from './login-panel.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginPanelComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class LoginModule { }
