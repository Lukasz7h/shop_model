import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { host } from '../main/host';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {

  constructor(
    private http: HttpClient
  ){}

  // pobieramy produkty jakie użytkownik ma w koszyku
  getProducts()
  {
    return this.http.get(host+"/basket/view", {headers: {"Content-Type": "application/x-www-form-urlencoded"}, withCredentials: true});
  }

  // usuwamy produkt z koszyka
  removeFromBasket(productName: string, productType: string)
  {
    return this.http.delete(host+"/basket/delete/"+productName+"/"+productType, {withCredentials: true});
  }

  // zmieniamy ilośc danego produktu w koszyku
  changeProductCount(e, count)
  {
    return this.http.post(host+"/basket/productCount", "data="+JSON.stringify({product: e.product, count: count}), {headers: {"Content-Type": "application/x-www-form-urlencoded"}, withCredentials: true});
  }
}
