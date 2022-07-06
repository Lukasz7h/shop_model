import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { host } from '../main/host';
import { CurrDataService } from '../main/products/curr-data/curr-data.service';

@Injectable({
  providedIn: 'root'
})
export class ValidService {

  constructor(
    private http: HttpClient,
    private url: CurrDataService
  )
  {}

  validLogin(form)
  {
    this.http.post( host+"/auth/login", "user="+JSON.stringify({login: form.login, password: form.password}), {headers: {"Content-type": "application/x-www-form-urlencoded"}, withCredentials: true}).subscribe(e => {
      if(e["isLog"])
      {
        window.history.back();
      }
    })
  }
}
