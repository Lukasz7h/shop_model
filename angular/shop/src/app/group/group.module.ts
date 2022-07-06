import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupComponent } from './group.component';
import { DetailsComponent } from './details/details.component';

import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    GroupComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class GroupModule { }
