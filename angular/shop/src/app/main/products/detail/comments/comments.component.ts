import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { faComment, faStar } from '@fortawesome/free-solid-svg-icons';

import { CommentsService } from './comments.service';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnDestroy, AfterViewInit
{
  constructor(private commentServ: CommentsService){}

  _comments: [{comment: string, count: number}] | any = [];
  faStar = faStar;

  faComm = faComment;

  ngOnInit(): void
  {
    this.commentServ.socket = io("http://localhost:3000", {transports : ["websocket"]});

    this.commentServ.socket.on("message", (data) => {
      console.log(data);
      this._comments.push(data);
    });
  }

  @ViewChild("commentSection")
  section: ElementRef;

  @Input() set comments(value: [{comment: string, count: number}])
  {
    this._comments = value;
  }

  addClassToStar(id: number, count: number) {
    return id <= count;
  };

  @ViewChild("showComm")
  showComm: ElementRef;

  @ViewChild("art")
  art: ElementRef;

  ngAfterViewInit(): void {
    let flag: boolean = false;

    this.showComm.nativeElement.addEventListener("click", () => {
      flag = !flag;

      flag?  (this.art.nativeElement.classList.add("show"), this.showComm.nativeElement.classList.add("active"))
      : (this.art.nativeElement.classList.remove("show"), this.showComm.nativeElement.classList.remove("active")); 
    });
  }

  ngOnDestroy(): void {
    this.commentServ.socket.close();
  }
}