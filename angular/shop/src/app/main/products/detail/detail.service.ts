import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { host } from "../../../main/host"

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  constructor(
    private http: HttpClient
  ){}

  // zwracamy informacje czy istnieje taki przedmior w naszym zbiorze id
  hadThatItem(id: number, stuffsIdList: string): boolean
  {
    return !!stuffsIdList.split(",").find(_id => parseInt(_id) === id);
  }

  // pobieramy produkty kupione przez użytkownika
  usersStuff()
  {
    return this.http.get(host+"/user-data/user-bought", {withCredentials: true});
  }

  // pobieramy komentarze produktu
  getComments(id)
  {
    return this.http.get(host+"/user-data/comments/"+id);
  }
}