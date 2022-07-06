import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddAccountService } from './add-account.service';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent{

  errors = [];

  constructor(
    private accountService: AddAccountService
  ){}

  // sprawdzamy czy podane dane spełniają wymagania
  validForm(registerForm: NgForm): void
  {
    const resOfValid = this.accountService.validRegisterForm(registerForm);

    !resOfValid.is_success? this.errors = JSON.parse(resOfValid.errors): this.accountService.addAccount(registerForm.value)
    .subscribe((e: {error: boolean, addUser: boolean, message: string} )=> {
      // jeśli server zwróci błąd to informujemy o nim
      if(e.error) this.errors.push(e.message);
    });
  }

}