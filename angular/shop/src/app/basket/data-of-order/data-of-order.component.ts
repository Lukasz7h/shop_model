import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CheckFormService } from './checkForm/check-form.service';
import { FormSettingsService } from './formSettings/form-settings.service';

import { GetOrderDataService } from './get-order-data.service';

@Component({
  selector: 'app-data-of-order',
  templateUrl: './data-of-order.component.html',
  styleUrls: ['./data-of-order.component.css']
})
export class DataOfOrderComponent implements OnInit
{
  controlsArray: string[] = [];
  dataOfOrderForm: FormGroup;

  resultsObj: Object = {};
  userOrderData;

  controls;

  constructor(
    private formBuilder: FormBuilder,
    private formSettingsService: FormSettingsService,
  
    private checkFormService: CheckFormService,
    private getOrderDataService: GetOrderDataService
  )
  {
    this.dataOfOrderForm = formBuilder.group({
      name: "",
      surname: "",
      city: "",
      post_code: "",
      street: "",
      house_number: "",
      apartment_number: "",
      phone: "",
      email: "",
    });

    for(let control in this.dataOfOrderForm.value)
    {
      control == "apartment_number"? this.resultsObj[`${control}`] = true: this.resultsObj[`${control}`] = false;
      this.dataOfOrderForm.get(`${control}`).valueChanges.subscribe(e => {
        this.checkControls(e, control);
      });
    };
  }

  // sprawdzamy czy wartość aktualnie uzupełnianego pola jest zgodna
  checkControls(e, control)
  {
    const method = this.formSettingsService.controlsSettings[`${control}`];
    this.resultsObj[`${control}`] = method(e);
  }

  ngOnInit(): void
  {
    // jeśli użytkownik uzupełniał już formularz to pobieramy dane którymi został uzupełniony formularz i uzupełnić nimi nasz aktualny formularz
    this.getOrderDataService.getOrderData().subscribe(data => {
      this.userOrderData = data;

      this.dataOfOrderForm.patchValue(data);
    });
  }

  // wysyłamy dane o zamówieniu do sprawdzenia
  send()
  {
    this.checkFormService.checkForm(this.resultsObj, this.dataOfOrderForm.value);
  }
};