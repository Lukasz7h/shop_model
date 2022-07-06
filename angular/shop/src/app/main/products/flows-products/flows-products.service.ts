import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductDto } from '../../../dto/product.dto';

@Injectable({
  providedIn: 'root'
})
export class FlowsProductsService {

  // jest to subject który nasłuchujemy by uzyskać aktualne produkty
  products: Subject<ProductDto[]> = new Subject<ProductDto[]>();
}
