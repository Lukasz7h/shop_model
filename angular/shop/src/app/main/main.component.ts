import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { fromEvent } from 'rxjs';
import { ProductDto } from '../dto/product.dto';

import { AuthGuard } from './add-product/guard/auth-guard';
import { AuthService } from './auth/auth.service';

import { CurrDataService } from './products/curr-data/curr-data.service';
import { FlowsProductsService } from './products/flows-products/flows-products.service';

import { faCommentDots, IconDefinition, faCheck } from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [AuthGuard]
})
export class MainComponent implements OnInit, AfterViewInit {

  isAdmin: boolean;
  userLog: boolean;

  faChat: IconDefinition = faCommentDots;

  constructor(
    private currDataServ: CurrDataService,
    private flowsProcuts: FlowsProductsService,
  
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ){};

  async ngOnInit()
  {
    let period: string;
    let group: string;

    this.activatedRoute.paramMap.subscribe(e => {
      period = e.get("period");
      group = e.get("group");

      this.currDataServ.group = group;
      this.currDataServ.period = period;
    });

    this.currDataServ.takeProducts(period, group).subscribe((e: ProductDto[]) => {
      this.flowsProcuts.products.next(e);
    });
  }

  @ViewChild("addProductButton")
  addProductButton: ElementRef;

  @ViewChild("showChat")
  showChat: ElementRef;

  chat;
  faCan: IconDefinition = faCheck;

  can: boolean = false;
  ngAfterViewInit()
  {
    this.listenPageScroll();

    this.authService.canAdd().subscribe(e =>{

      this.isAdmin = !!e["userCan"];
      const chatChild = document.getElementById("chat");
      
      this.isAdmin? chatChild.style.width = "auto": chatChild.style.width = "624px";

      this.chat = document.getElementById("chat");
      if(!this.isAdmin) this.chat.style.right = "-235px";

      if(e['userCan'] !== false) this.addProductButton.nativeElement.style.display = "block";
      this.userLog = e["userLog"];
    });
    
    document.getElementById("info").style.position = "relative";
  }

  flagChat: boolean = false;
  hasShowChat(showChatButton: HTMLDivElement)
  {
    if(!this.can) return;
    !this.flagChat? this.chat.style.display = "flex": this.chat.style.display = "none";
    this.flagChat = !this.flagChat;
  }

  // wylogowywanie
  logout()
  {
    this.authService.logout().subscribe(e => {
      if(e["logout"]) window.location.reload();
    });
  }

  // nasłuchujemy stan w strony i nadajemy style dla paska
  listenPageScroll()
  {
    const pageState = document.getElementById("page_state");
    const currentScroll = Math.round(window.scrollY / (document.body.offsetHeight - window.innerHeight) * 100);

    pageState.style.width = currentScroll+"%";
    
    fromEvent(document, "scroll")
    .subscribe(() => {
      const currentScroll = Math.round(window.scrollY / (document.body.offsetHeight - window.innerHeight) * 100);

      pageState.style.width = currentScroll+"%";
    });
  }

  // czy możemy rozpocząć czat
  canChat(data: boolean)
  {
    this.can = data;
  }
};