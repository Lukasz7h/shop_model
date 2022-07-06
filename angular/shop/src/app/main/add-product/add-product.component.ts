import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { AuthService } from '../auth/auth.service';
import { CheckProductService } from './check-product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent
{

  formProduct: FormGroup;
  specification: FormArray;
  formImages: any[] = [];

  group: Array<string> = ["Mężczyźni", "Kobiety", "Dzieci"];
  bodyParts: Array<string> = ["Głowa", "Korpus", "Nogi", "Stopy"];
  seasons: Array<string> = ["Wiosna", "Lato", "Jesień", "Zima"];

  constructor(
    private formBuilder: FormBuilder,
    private checkProduct: CheckProductService,
    private authService: AuthService
  )
  {
    this.formProduct = formBuilder.group({
      productName: "",
      productDescription: "",
      productGroup: this.group[0],
      productBodyPart: this.bodyParts[0],
      productSeason: this.seasons[0],
      productPrice: 1,
      files: null,
      productSpecification: formBuilder.array( [this.createItem()] )
    });

    this.specification = this.formProduct.get("productSpecification") as FormArray;
    document.getElementById("info").style.position = "fixed";
  };

  canAdd()
  {
    this.authService.canAdd().subscribe();
  }

  createItem(): FormGroup
  {
    return this.formBuilder.group({
      name: "",
      value: ""
    });
  };

  addItem(): void
  {
    this.specification.push(this.createItem());
  };

  removeItem(id: number): void
  {
    this.specification.removeAt(id);
  };

  checkLength(inpName: string): void
  {
    const inpValue = this.formProduct.get(inpName).value;
    this.checkProduct.checkLength(inpName, inpValue, inpName);
  }

  isWell(inpName: string): boolean
  {
    return inpName === "productName" && this.formProduct.get(inpName).value.length >= 7?
    true:
    (inpName === "productDescription" && this.formProduct.get(inpName).value.length >= 40);
  }

  sendForm(): void
  {
    const res = this.checkProduct.checkPropertyOfProduct(this.formProduct.value, this.formImages);
  };

  addPhotos(e)
  {
    const files = e.files;
    const len = files.length;

    this.formImages = [];
    
    for(let i=0; i<len; i++)
    {
      this.formImages.push(files[i]);
    };
  }
}