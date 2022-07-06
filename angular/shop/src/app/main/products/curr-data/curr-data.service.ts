import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ProductDto } from '../../../dto/product.dto';
import { host } from '../../host';

import { urlSettings } from '../../urlSettings';

@Injectable({
  providedIn: 'root'
})
export class CurrDataService {

  period: string = null;
  group: string = null;
  bodyPart: string = "corpus";

  constructor(
    private httpClient: HttpClient,
  ){};

  takeProducts(season: string, group: string, bodyPart: string = "corpus", prop = null)
  {
    function values(data)
    {
      let res = null;
      urlSettings.filter((e) => {
          
        for(let x in e)
        {
          if(e[x] === data) res = x;
        }
      })

      return res;
    };

    const thatSeason = values(season);
    const thatGroup = values(group);

    return prop === null?
    this.httpClient.get<ProductDto[]>(`${host}/stuff/sezon/${thatSeason}/${thatGroup}/${bodyPart}`): 
    this.httpClient.post<ProductDto[]>(`${host}/stuff/sezon/${thatSeason}/${thatGroup}/${bodyPart}`, "properties="+JSON.stringify(prop), {headers: {"Content-type": "application/x-www-form-urlencoded"}});
  };

  takeDetailsOfProduct(id: number)
  {
    return this.httpClient.get(`${host}/stuff/detail/${id}`);
  };

  takePhotosOfProduct(id: number, i: number)
  {
    return this.httpClient.get(`${host}/stuff/detail/photos/${id}/${i}`, {responseType: "blob"});
  };

}