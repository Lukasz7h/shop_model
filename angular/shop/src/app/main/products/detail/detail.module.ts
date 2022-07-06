import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailComponent } from './detail.component';
import { FormsModule } from '@angular/forms';

import { ReviewComponent } from './review/review.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CommentsComponent } from './comments/comments.component';

@NgModule({
  declarations: [
    DetailComponent,
    ReviewComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class DetailModule {}