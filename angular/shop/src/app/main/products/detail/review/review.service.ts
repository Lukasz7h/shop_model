import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { host } from 'src/app/main/host';
import { CommentsService } from '../comments/comments.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(
    private http: HttpClient,
    private commentServ: CommentsService
  ){}

  divStars: HTMLElement;
  countStars: number;

  // ustawamiamy style dla wybranej oceny 
  setStar(data): void
  {
    const element = data.target as HTMLElement;

    const parent = element.parentElement;
    const grandpa = parent.parentElement;

    let that;
    if(
      that = parent.getAttribute("count-star")
      ||
      grandpa.getAttribute("count-star")
    )
    {
      const count = parseInt(that);
      this.countStars = count;

      Array.from(this.divStars.childNodes).forEach((element: HTMLElement) => {
        element.classList.remove("check");
      });

      for(let i = 0; i<count; i++)
      {
        const element = Array.from(this.divStars.childNodes)[i] as HTMLElement;
        element.classList.add("check");
      };
    };
  }

  // sprawdzamy wartość komentarza 
  checkComment(formValue: {comment: string}): boolean
  {
    return (formValue.comment.length > 15 && formValue.comment.length < 400) && !!this.countStars;
  }

  // wysyłamy napisany komentarz
  sendComment(data, id: number)
  {
    this.http.post(host+"/user-data/add-comment", "addComm="+JSON.stringify({comment: data.comment, count: this.countStars, id}), {headers: {"Content-Type": "application/x-www-form-urlencoded"}, withCredentials: true})
    .subscribe(e => {
      if(e['addComment']) this.commentServ.socket.emit("message", {comment: data.comment, count: this.countStars, id});
    });
  }
}