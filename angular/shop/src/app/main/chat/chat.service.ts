import { Injectable } from '@angular/core';
import * as uuid from "uuid";

@Injectable({
  providedIn: 'root'
})
export class ChatService
{
  socket;
  users: [{uniq: string, data: [{customer: boolean, message: string}], uuid: string}];

  canWrite: boolean = false;

  // nowy użytkownik rozpoczął rozmowe
  newUserSendMessage(_customers, data, add)
  {
    const newUser = document.createElement("div");

    if(add) this.users.push(data);
    newUser.setAttribute("data-user", data.uuid);

    newUser.classList.add("customer");
    _customers.insertAdjacentElement("afterbegin", newUser);
  }

  // odbieramy i obsługujemy wiadomość otrzymaną z web socket'a
  getMessage(data: {uniq?: string, message: string, customer: boolean}, _customers: HTMLElement): void
  {
    const uniqID = uuid.v4();
    if(!this.users)
    {
      this.users = [{uniq: data.uniq, data: [{customer: true, message: data.message}], uuid: uniqID}];

      Object.defineProperty(data, "uuid", {
        value: uniqID,
        configurable: true
      });

      this.newUserSendMessage(_customers, data, false);
    }
    else if(!this.users.find((user) => user.uniq == data.uniq))
    {
      this.newUserSendMessage(_customers, {uniq: data.uniq, data: [{customer: true, message: data.message}], uuid: uniqID}, true);
    }
    else
    {
      for(let user of this.users)
      {
        if(user.uniq == data.uniq)
        {
          user.data.push({
            customer: data.customer,
            message: data.message
          });
          break;
        };
      };
    };
  }

}