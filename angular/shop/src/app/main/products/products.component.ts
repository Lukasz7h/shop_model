import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

import { ProductDto } from 'src/app/dto/product.dto';
import { CurrDataService } from './curr-data/curr-data.service';

import { FlowsProductsService } from './flows-products/flows-products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{

  products: ProductDto[];
  period: string;

  group: string;
  eventSub: Subscription;
  constructor(
    private flowsProducts: FlowsProductsService,
    private currData: CurrDataService
  )
  {
    this.eventSub = this.flowsProducts.products.subscribe(e => this.products = e);
  }
  
  ngOnInit()
  {
    this.period = this.currData.period;
    this.group = this.currData.group;

    let flag: boolean = false;
    let currentElement: HTMLElement;

    // nasłuchujemy komponent z produktami i gdy na któryś najedziemy myszką to dodajemy mu wylosowany kolor
    fromEvent(document.body.getElementsByTagName("app-products").item(0), "mousemove").subscribe((e) => {

      if( (e.target["classList"].value == "product" && !flag) || currentElement !== e.target)
      {
        if(e.target["parentNode"]["classList"].value.includes("product")) return;
        flag = true;
        if(currentElement !== e.target && currentElement) this.removeBackgroundColor(currentElement)

        let target = e.target;
        if(e.target["parentNode"]["classList"] == "product") target = e.target["parentNode"];
        
        this.hoverEffect(target as HTMLElement);
        currentElement = target as HTMLElement;
      }
      else if(!e.target["classList"].value.includes("product"))
      {
        flag = false;
        if(currentElement) this.removeBackgroundColor(currentElement);
      };
    });
  }

  ngOnDestroy(): void {
    this.eventSub.unsubscribe();
  }

  // zaokrąglamy ocene
  reviewFloat(review: number)
  {
    return review.toFixed(1);
  }

  // losujemy klase dla elementu z produktem (losujemy kolor)
  hoverEffect(productElement: HTMLElement)
  {
    const allowCollors = ["first", "second", "third"];
    productElement.classList.add(allowCollors[ Math.floor(  Math.random() * allowCollors.length ) ]+"_style");
  }

  // usuwamy kolor z elementu
  removeBackgroundColor(productElement: HTMLElement)
  {
    productElement.classList.remove("first_style");
    productElement.classList.remove("second_style");
    productElement.classList.remove("third_style");
  }
};