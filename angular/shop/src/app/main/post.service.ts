import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { host } from './host';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  http: any;

  constructor(
    private httpClient: HttpClient
  ){}

  saveProduct(product: FormGroup, images: []): void
  {
    const _product = new FormData();

    _product.append("productData", JSON.stringify(product));
    _product.append("filesCount", images.length.toString());

    images.forEach(photo => {
      _product.append("files", photo);
    });

    this.httpClient.post(host+"/stuff/add", _product, {withCredentials: true})
    .subscribe();
  }

  // dodajemy produkt do koszyka
  addToBasket(product, count: number, productSize: string)
  {
    return this.httpClient.post(host+"/basket/add", "product="+JSON.stringify({data: product, count: count, size: productSize}), {headers: {"Content-Type": "application/x-www-form-urlencoded"}, withCredentials: true});
  }

  getUniqCookie()
  {
    return this.httpClient.get(host+"/uniq-cookie/create", {withCredentials: true});
  }
}