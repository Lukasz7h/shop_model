import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitialViewComponent } from './initial-view.component';
import { SeasonComponent } from '../season/season.component';

import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    InitialViewComponent,
    SeasonComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class InitiaViewModule { }
