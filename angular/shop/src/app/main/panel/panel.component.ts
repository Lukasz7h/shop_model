import { Options } from '@angular-slider/ngx-slider';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { Subscriber, Subscription } from 'rxjs';
import { debounceTime } from "rxjs/operators";

import { ProductDto } from 'src/app/dto/product.dto';
import { CurrDataService } from '../products/curr-data/curr-data.service';

import { FlowsProductsService } from '../products/flows-products/flows-products.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit, OnDestroy{

  constructor(
    private currData: CurrDataService,
    private flowsProduct: FlowsProductsService
  ){}

  sliderForm: FormGroup = new FormGroup({
    search: new FormControl(""),
    price: new FormControl([0, 1000])
  })

  options: Options = {
    floor: 0,
    ceil: 1000
  }

  formEvent: Subscription;
  ngOnInit()
  {

    // wysyłamy informacje o tym jakie produkty mają być wyświetlone (serwer zwraca odpowiednie produkty)
    this.formEvent = this.sliderForm.valueChanges.pipe(
      debounceTime(1500)
    )
    .subscribe((e) => {
      this.currData.takeProducts(this.currData.period, this.currData.group, this.currData.bodyPart, {name: "price", prop: e})
      .subscribe((e: ProductDto[]) => this.flowsProduct.products.next(e));
    });
  }

  ngOnDestroy(): void {
    this.formEvent.unsubscribe();
  }
};