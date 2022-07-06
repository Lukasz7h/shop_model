import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { host } from 'src/app/main/host';
import { CheckFormService } from '../data-of-order/checkForm/check-form.service';

@Component({
  selector: 'app-paymant-method',
  templateUrl: './paymant-method.component.html',
  styleUrls: ['./paymant-method.component.css']
})
export class PaymantMethodComponent implements AfterViewInit
{

  constructor(
    private checkFormService: CheckFormService,
    private http: HttpClient,
    private route: Router
  ){}

  @ViewChild("card")
  inputCardMethod: ElementRef;

  @ViewChild("online")
  inputOnlineMethod: ElementRef;

  @ViewChild("cash")
  inputCashMethod: ElementRef;

  ngAfterViewInit(): void
  {
    this.inputCardMethod.nativeElement.disabled = !this.paymantMethod.card;
    this.inputOnlineMethod.nativeElement.disabled = !this.paymantMethod.online;
    this.inputCashMethod.nativeElement.disabled = !this.paymantMethod.cash;
  }

  // objekt z dostępnymi metodami płatności
  paymantMethod = {
    card: true,
    online: false,
    cash: true
  }

  // wysyłamy informacje o tym jaki sposób płatności wybrał użytkownik
  send(formPaymants: NgForm): void
  {
    if(this.paymantMethod[`${formPaymants.value.paymant}`])
    {
      this.http.patch(host+"/user-data/paymant", "data="+JSON.stringify(formPaymants.value), {headers: {"Content-Type": "application/x-www-form-urlencoded"}, withCredentials: true})
      .subscribe((e: any) => {
        if(e.orderWell) this.route.navigate(["/"]);
      })
    };
  }
};