import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewService } from './review.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ReviewService
  ]
})
export class ReviewModule{
}
