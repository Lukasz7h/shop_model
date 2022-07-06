import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DetailsOfProductDto } from 'src/app/dto/detailsOfProduct.dto';
import { PostService } from '../../post.service';

import { CurrDataService } from '../curr-data/curr-data.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { DetailService } from './detail.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit
{

  product: DetailsOfProductDto;
  productCount: number = 1;

  photos = [];
  canReview: boolean = false;

  comments: [{comment: string, count: number}];
  productSize: string = "L";

  constructor(
    private activatedRoute: ActivatedRoute,
    private currData: CurrDataService,

    private postService: PostService,
    private sanitizer: DomSanitizer,

    private detailService: DetailService
  ){};

  ngOnInit(): void {

    let productID: number;
    this.activatedRoute.paramMap.subscribe(e => {
      productID = parseInt(e.get("id"));

      // pobieramy szczegółowe informacje o produkcie
      this.currData.takeDetailsOfProduct(productID)
      .subscribe((e: DetailsOfProductDto) => {

        this.product = e;
        let specification = this.product.detail.specification;

        if(specification !== null && typeof specification === "string") specification = JSON.parse(specification);

        // jeśli dla danego produkty istnieją dodane zdjęcia
        if(e.getFiles)
        {
          for(let i = 0; i<e.filesCount; i++)
          {
            this.currData.takePhotosOfProduct(productID, i)
            .subscribe((e: Blob)=>{

              const urlCreator = window.URL || window.webkitURL;
              const imageUrl = urlCreator.createObjectURL(e);

              this.photos.push(imageUrl);
            })
          };
        };
        this.product.detail.specification = specification;
      });
    });

    this.detailService.usersStuff()
    .subscribe((e: {products_id: string}) => {
      if(e) this.canReview = this.detailService.hadThatItem(productID, e.products_id);
    });

    // pobieramy komentarze dla produktu 
    this.detailService.getComments(productID).subscribe((e: [{comment: string, count: number}]) => {
      this.comments = e;
    });

    document.getElementById("info").style.position = "fixed";
  }

  // zabezpieczamy url ze zdjęciem produktu
  transformUrl(url: string): SafeResourceUrl
  {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  issetSpecification()
  {
    const specification = this.product?.detail.specification;
    return typeof specification !== "string" && specification !== undefined && specification !== null && specification.length > 0;
  }

  // dodajemy produkt od koszyka
  addProductToBasket()
  {
    this.postService.addToBasket(this.product, this.productCount, this.productSize).subscribe();
  }

}