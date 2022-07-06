import { Component } from '@angular/core';
import { ProductDto } from 'src/app/dto/product.dto';

import { CurrDataService } from '../products/curr-data/curr-data.service';
import { FlowsProductsService } from '../products/flows-products/flows-products.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent{

  constructor(
    private currDatasServ: CurrDataService,
    private flowsServ: FlowsProductsService
  ){}

  // pobieramy produktu do wyświetlenia dla użytkownika
  getFromServ(data: Element): void
  {
    const period = this.currDatasServ.period;
    const group = this.currDatasServ.group;

    this.currDatasServ.bodyPart = data.id;

    this.currDatasServ.takeProducts(period, group, data.id).subscribe((e: ProductDto[]) => {
      this.flowsServ.products.next(e);
    });
  }
}