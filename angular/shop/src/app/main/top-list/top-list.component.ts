
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { map } from 'rxjs/operators';
import { ProductDto } from 'src/app/dto/product.dto';

import { CurrDataService } from '../products/curr-data/curr-data.service';
import { FlowsProductsService } from '../products/flows-products/flows-products.service';

@Component({
  selector: 'app-top-list',
  templateUrl: './top-list.component.html',
  styleUrls: ['./top-list.component.css']
})
export class TopListComponent implements AfterViewInit, OnInit
{

  period: string;
  group: string;

  topProducts: ProductDto[] = [];

  rightArrow = faArrowRight;
  leftArrow = faArrowLeft;

  constructor
  (
    private flowProductsService: FlowsProductsService,
    private currData: CurrDataService
  )
  {

    // wybieramy produkty które znajdą się w top liście
    flowProductsService.products
    .pipe(
      map((v: ProductDto[]) => {
        return v.filter((e) => e.review);
      })
    )
    .subscribe((products) => {
      products.sort((a, b) => a.review - b.review).reverse();

      this.topProducts = [];

      for(let i=0; i<10; i++)
      {
        if(products[i]) this.topProducts.push(products[i]);
        else break;
      };
    })
  }

  ngOnInit()
  {
    this.period = this.currData.period;
    this.group = this.currData.group;
  }

  @ViewChild("list")
  list: ElementRef;

  ngAfterViewInit(): void
  {
    let flag: boolean = false;

    this.list.nativeElement.addEventListener("mousedown", () => {
      flag = true;
    });

    document.body.addEventListener("mouseup", () => {
      flag = false;
    });
  }

  partOfArr(i: number)
  {
    return i == 1? this.topProducts.slice(0, 5): this.topProducts.slice(4, 10);
  }

  slideTopList(digit: number, list: HTMLElement)
  {
    digit? list.style.marginLeft = "0%": list.style.marginLeft = "-50%";
  }
}