import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CheckFormService {

  constructor(
    private route: Router,
    private http: HttpClient
    ){}

  checkForm(objOfFlags, form)
  {
    let flag = true;
    for(let e in objOfFlags)
    {
      if(!objOfFlags[`${e}`]) flag = false;
    };

    if(flag)
    {
      this.http.post("http://localhost:3000/user-data/order", "orderData="+JSON.stringify(form), {headers: {"Content-Type": "application/x-www-form-urlencoded"}, withCredentials: true})
      .subscribe((e) => {
        if(e['addOrderData']) this.route.navigate(["/płatność"]);
      });
    };
  }
}