import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ValidService } from './valid.service';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.css']
})
export class LoginPanelComponent{

  constructor(private valid: ValidService){}

  login(loginForm: NgForm)
  {
    this.valid.validLogin(loginForm.value);
  }

}