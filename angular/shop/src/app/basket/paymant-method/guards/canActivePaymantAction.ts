import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { host } from "src/app/main/host";

@Injectable({
    providedIn: "root"
})
export class CanActivePaymant
{
    constructor(
        private http: HttpClient
    ){}

    can()
    {
        return this.http.get(host+"/basket/paymant/can", {withCredentials: true});
    }
};