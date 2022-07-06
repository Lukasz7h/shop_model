import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { host } from '../host';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ){}

  canAdd()
  {
    return this.http.get(host+"/auth/check", {withCredentials: true});
  }

  logout()
  {
    return this.http.get(host+"/auth/logout", {withCredentials: true});
  }
}
