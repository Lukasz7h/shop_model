import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { ReviewService } from './review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements AfterViewInit, OnInit{

  faStar = faStar;
  id: number;

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
  }

  @ViewChild("stars")
  starsDiv: ElementRef;

  ngAfterViewInit(): void {
      this.reviewService.divStars = this.starsDiv.nativeElement;

      // nasłuchyjemy jaką ocene wystawi użytkownik
      fromEvent<MouseEvent>(this.starsDiv.nativeElement, "mousemove")
      .pipe(
        debounceTime(20)
      )
      .subscribe((e) => {
        this.reviewService.setStar(e);
      });
  }

  // sprawdzamy i ewentualnie wysyłamy komentarz
  send(form: NgForm): void
  {
    if(this.reviewService.checkComment(form.value)) this.reviewService.sendComment(form.value, this.id);
  }
};