
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PostService } from '../post.service';

@Injectable({
  providedIn: 'root'
})
export class CheckProductService {

  constructor(
    private postService: PostService
  ){};

  showErrors(inputName: string): void
  {
    const inp = document.getElementsByName(inputName).item(0);
    inp.classList.add("wrong");
  };

  removeErrors(inputName: string): void
  {
    const inp = document.getElementsByName(inputName).item(0);
    inp.classList.remove("wrong");
  };

  checkPropertyOfProduct(formProduct: FormGroup, images): void
  {
    let inp = formProduct["productName"].length < 7?
    (formProduct["productDescription"].length < 40? {ok: false, name: ["productName","productDescription"]}: {ok: true}):
    (formProduct["productDescription"].length < 40? {ok: false, name: "productDescription"}: {ok: true});

    if(!inp.ok)
    {
      inp.name instanceof Array?(inp.name.forEach(inputName => this.showErrors(inputName))): this.showErrors(inp.name);
    };

    if(formProduct["productPrice"] < 1)
    {
      this.showErrors("productPrice");
    }
    else if(inp.ok)
    {
      this.postService.saveProduct(formProduct, images);
    };
  };

  checkLength(inpName: string, task: string, type: string)
  {
    if(task.length < 7 && type === "productName")
    {
      this.showErrors(inpName);
    }
    else if(task.length < 40 && type === "productDescription")
    {
      this.showErrors(inpName);
    }
    else
    {
      this.removeErrors(inpName);
    };
  };
}