import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

import { CanActivePaymant } from "./canActivePaymantAction";

@Injectable()
export class PaymantGuard implements CanActivate
{

    constructor(
        private router: Router,
        private canActivePaymant: CanActivePaymant
    ){}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        
        const that = this;
        function getData(): Promise<boolean>
        {
            return new Promise((resolve, reject) => {
                that.canActivePaymant.can().subscribe((e: any) => {
                    if(!e.can)
                    {
                        that.router.navigate(["/"]);
                        return reject(false);
                    };

                    return resolve(true);
                });
            });
        };

       const res = await getData();
       return res;
    }
}