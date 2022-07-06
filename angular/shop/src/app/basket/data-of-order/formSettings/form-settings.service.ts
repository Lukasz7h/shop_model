import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormSettingsService {

  constructor(){};
  checkLen = (task: string, max = null) => max === null? task.length > 2: task.length > 0 && task.length < max;
  getInp: (word: string) => HTMLElement = (word: string) => document.getElementsByName(word).item(0)

  // w tym objekcie znajdują się metody odpowiadające polom w formularzu metody te sprawdzają czy wartość o owego pola jest zgodna z wymaganiami
  controlsSettings = {
    name: (task: string) => this.checkLen(task),
    surname: (task: string) => this.checkLen(task),

    city: (task: string) => this.checkLen(task),

    post_code_inp: document.getElementsByName("post_code"),
    post_code: (code: string) => {

      const inp = this.getInp("post_code");
      if(inp["value"].length == 2) inp["value"] += "-";

      const inpValueArr = inp["value"].split("");
      let id;

      if(id = inpValueArr.indexOf("-"))
      {
        if(id >= 0)inpValueArr.splice(id, 1);
        if(inpValueArr.length > 2) inpValueArr.splice(2, 0, "-");
      };

      const inpValue = inpValueArr.join("");
      inp["value"] = inpValue;
      return !!/[0-9]{2,2}-[0-9]{3,3}/.exec(code);
    },

    street: (task: string) => this.checkLen(task),
    house_number: (h_number: string) => {

      const isNum = parseInt(h_number);
      return !this.checkLen(h_number, 0) && !isNaN(isNum);
    },

    apartment_number: (task: string) => {
      return task.length > 0? !isNaN(parseInt(task)): true;
    },
    phone: (_number) => {
      _number = _number.toString();
      return _number.length > 0? !!/[0-9]{9,9}/.exec(_number): false;
    },

    email: (task: string) => {
      return this.checkLen(task, 128)? !!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]/.exec(task): false;
    }
  };
}
