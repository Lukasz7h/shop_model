import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { host } from 'src/app/main/host';

@Injectable({
  providedIn: 'root'
})
export class GetOrderDataService
{
  constructor(
    private http: HttpClient
  ){}

  getOrderData()
  {
    return this.http.get(host+"/user-data/orderData", { withCredentials: true});
  }
};