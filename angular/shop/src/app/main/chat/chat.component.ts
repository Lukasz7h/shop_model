import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ChatService } from './chat.service';

import { io } from "socket.io-client";
import { PostService } from '../post.service';

import { faUser, IconDefinition } from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewInit
{

  canWrite: boolean;
  messages;

  constructor(
    private chatService: ChatService,
    private postService: PostService
  ){
    this.canWrite = chatService.canWrite;
  }

  faUser: IconDefinition = faUser;

  currentUser: string;
  chat: HTMLElement;

  @Input() admin: boolean = false;
  @Output() emit: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild("messagesContainer")
  messagesContainer: ElementRef;

  @ViewChild("customers")
  customersElement: ElementRef;

  ngAfterViewInit(): void
  {
    this.chat = this.messagesContainer?.nativeElement;
    let _customersElement = this.customersElement?.nativeElement;

    this.postService.getUniqCookie()
    .subscribe(() => {
      this.chatService.socket = io("http://localhost:700", {transports: ["websocket"] , withCredentials: true, secure: true});

      this.chatService.socket.on("connection", (data: {canWrite: boolean}) => {
        this.canWrite = data.canWrite;
        this.emit.emit(this.canWrite);
      });

      this.chatService.socket.on("message", (data) => this.socketOnMessage( data, _customersElement));
    });

  }

  socketOnMessage(data: {uniq?: string, message: string, customer?: boolean, chat: [{customer: boolean, message: string}]}, _customersElement)
  {
    console.log(data);
    if(data.chat)
    {
      data.customer = !data.customer;

      const chat = data.chat['messages'];
      if(!_customersElement)
      {
        _customersElement = this.customersElement?.nativeElement;
        if(_customersElement) this.changeUser(_customersElement);
      };

      ("message" in chat[0])?
      (() => {
        chat.forEach(element => {
          const uniq = element.uniq;

          if(element.message.length > 0) element.message.forEach(element => {

            element.uniq = uniq;
            this.chatService.getMessage(element, _customersElement);
          });
        });

        this.messages = chat[0].message;
      })():
      this.messages = chat[0];

      this.currentUser = chat[0].uniq;
    };
    
    if(!this.chat) this.chat = this.messagesContainer?.nativeElement;

    if(data.uniq)
    {
      data.customer = !data.customer;

      if(!_customersElement)
      {
        _customersElement = this.customersElement?.nativeElement;
        this.changeUser(_customersElement);
      };
      const {uniq, message, customer} = data;

      this.chatService.getMessage({uniq, message, customer}, _customersElement);
      this.chatService.users.find((user) => {
        if(user.uniq == this.currentUser)
        {
          this.messages = user.data;
        };
      });
      return;
    }
    else if(typeof data == "string")
    {
      this.addMessage(data, false);
    };

  }

  sendMessage(message: string): void
  {
    if(!this.chat) this.chat = this.messagesContainer.nativeElement;
    this.chatService.socket.emit("message", this.currentUser? {message, uniq: this.currentUser}: message);

    if(!this.currentUser) this.addMessage(message, true);

    if(this.chatService.users)
    {
      for(let user of this.chatService.users)
      {
        if(user.uniq == this.currentUser)
        {
          user.data.push({customer: false, message});

          this.messages = user.data;
          break;
        };
      };
    };
  }

  // gdy użtkownik jest gościem to tą metodą dodajemy nowe wiadomości do jego czatu
  addMessage(data: string, flag: boolean)
  {
    const createMessageParagraph = document.createElement("p");
    const createDiv = document.createElement("div");

    createMessageParagraph.textContent = data;

    flag? createMessageParagraph.classList.add("main"): createMessageParagraph.classList.add("guest");
    this.chat.insertAdjacentElement("beforeend", createDiv);

    createDiv.insertAdjacentElement("afterbegin", createMessageParagraph);
  }

  // zmieniamy użytkownika z którym prowadzimy rozmowę
  changeUser(_customersElement: HTMLElement)
  {
    _customersElement.addEventListener("click", (e) => {
      const that: any = e.target;

      if(that.classList.value == "customer")
      {
        const userID = that.getAttribute("data-user");
        this.chatService.users.forEach((user) => {
          if(user.uuid == userID)
          {
            this.messages = user.data;
            this.currentUser = user.uniq;
          };
        });
      };
    });
  }

}