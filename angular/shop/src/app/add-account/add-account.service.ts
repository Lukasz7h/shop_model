import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { host } from '../main/host';

@Injectable({
  providedIn: 'root'
})
export class AddAccountService {

  constructor(
    private http: HttpClient
  ){}

  registerSettings = {
    name: {minLen: 4, maxLen: 18},
    email: {reg: /^[^\s@]+@[^\s@]+\.[^\s@]+$/},
    phone: {minLen: 4, maxLen: 18},
    password: {minLen: 7, maxLen: 30},
  }

  validRegisterForm(registerForm: NgForm)
  {
    
    try
    {
      let errors: Array<string> = [];
      var flag: boolean = false;
      const values = registerForm.value;

      const login = values.login;
      if(login.length < this.registerSettings.name.minLen || login.length > this.registerSettings.name.maxLen)
      {
        flag = true;
        errors.push(`Nazwa musi mieć od ${this.registerSettings.name.minLen} do ${this.registerSettings.name.maxLen} znaków.`);
      };
  
      const email = values.email;
      const emailReg = this.registerSettings.email.reg;
  
      let m;
      if(email && ( (m = emailReg.exec(email)) == null))
      {
        flag = true;
        errors.push("Proszę podać właściwy email");
      };

      let phone = values.phone;

      if(phone)
      {
        const regPhone = /^[0-9]{9}$/;
        let res;
        if((res = regPhone.exec(phone)) === null)
        {
          flag = false;
          errors.push("Podaj prawidłowy numer telefonu.");
        };
      };

      const password = values.password;
      const r_password = values.r_password;

      if(!password)
      {
        flag = true;
        errors.push(`Hasło musi mieć od ${this.registerSettings.password.minLen} do ${this.registerSettings.password.maxLen} znaków.`);
      }
      else
      {
        if
        (
          password.length < this.registerSettings.password.minLen || password.length > this.registerSettings.password.maxLen
        )
        {
          flag = true;
          errors.push(`Hasło musi mieć od ${this.registerSettings.password.minLen} do ${this.registerSettings.password.maxLen} znaków.`);
        }
        else if(password != r_password)
        {
          flag = true;
          errors.push("Hasła nie są identyczne");
        };
      };

      if(flag)
      {
        throw new Error(JSON.stringify(errors));
      };

      return{
        is_success: !flag
      }
    }
    catch(e)
    {
      return{
        is_success: !flag,
        errors: e.message
      }
    }
  }

  addAccount(account)
  {
    return this.http.post(host+"/auth/register", "user="+JSON.stringify(account), {headers: {"Content-type": "application/x-www-form-urlencoded"}});
  }
}
