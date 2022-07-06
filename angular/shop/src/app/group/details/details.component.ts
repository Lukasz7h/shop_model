import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent{

  @Input() title: string;
  data: string;

  constructor(
      private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.data = this.activatedRoute.snapshot.paramMap.get("period");
  }

}