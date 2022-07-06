import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { host } from "src/app/main/host";

@Injectable()
export class BasketIsEmpty implements CanActivate
{
    constructor(
        private http: HttpClient,
        private router: Router
    ){}
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>
    {
        const that = this;
        function result(): Promise<boolean>
        {
            return new Promise((resolve, reject) => {
                that.http.get(host+"/basket/empty", {withCredentials: true})
                .subscribe((e) => {
                    if(!e.hasOwnProperty("isNotEmpty") || !e["isNotEmpty"])
                    {
                        that.router.navigate(["/"]);
                        return reject(false);
                    };
                    return resolve(true);
                });
            });
        };

        const res = await result();
        return res;
    }
};