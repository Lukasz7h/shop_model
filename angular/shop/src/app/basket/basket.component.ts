import { Component, OnInit } from '@angular/core';
import { GetProductsService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  price: number = 0;
  basket = [];

  priceForAll: number = 0;

  constructor(
    private basketService: GetProductsService
  ){}

  // metoda która definiuje naszą tablice basket której dane są potem wyświetlane
  setBasket(e: [])
  {
    this.priceForAll = 0;
    for(let item of e)
    {
      let stuff: {count: number, product: object, size: string} = 
      {
        count: item["productCount"],
        product: item["product"],
        size: item["size"]
      };

      this.priceForAll += stuff.count * stuff.product['price'];
      this.basket.push(stuff);
    };

  }

  ngOnInit(): void {
    this.basketService.getProducts().subscribe((e: []) => {
      this.setBasket(e);
    });
  }

  // usuwamy dany produkt z koszyka
  async deleteFromBasket(e)
  {
    const productName = e.product.name;
    const productType = e.product.type;

    this.basketService.removeFromBasket(productName, productType).subscribe((e) => {

          if(e["delete"] === true)
          {
            this.basketService.getProducts().subscribe((e: [])=> {
              this.basket = [];
              this.setBasket(e);
            });
          };
    });
  }

  // zmieniamy ilość danego produktu
  changeProductCount(e, count)
  {
    if(e.count !== count)
    {
      this.basketService.changeProductCount(e, count).subscribe(e => {
        if(e["change"])
        {
          this.basketService.getProducts().subscribe((e: [])=> {
            this.basket = [];
            this.setBasket(e);
          });
        };
      });
    };
  }

  // zaokrąglamy podaną cene
  roundPrice(price: number): number
  {
    const count: number = Math.round(price * 100) / 100;
    return isNaN(count)? 0: count;
  }

  // zwracamy informacje o tym czy koszyk jest pusty
  basketIsEmpty = () => this.basket.length === 0;
}