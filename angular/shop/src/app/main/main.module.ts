import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main.component';
import { PanelComponent } from './panel/panel.component';

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ProductsComponent } from './products/products.component';

import { AppRoutingModule } from '../app-routing.module';
import { BodyComponent } from './body/body.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';

import { TopListComponent } from './top-list/top-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    MainComponent,
    BodyComponent,
    PanelComponent,
    ProductsComponent,
    ChatComponent,
    TopListComponent,
  ],
  imports: [
    CommonModule,
    NgxSliderModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class MainModule { }
