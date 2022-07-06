import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

import { AuthService } from "../../auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate
{
    constructor(
        private authService: AuthService,
        private router: Router
        ){}

    async canActivate(): Promise<boolean>
    {
        let flag: boolean;
        let res = (): Promise<boolean> => {
            return new Promise((resolve, reject) => {

                this.authService.canAdd().subscribe(e => {
                    if(!e["userCan"])
                    {
                        this.router.navigate([""]);
                        return reject(false);
                    }
                    else
                    { 
                        return resolve(true);
                    };
                });
            });
        };

        flag = await res();
        return flag;
    }
}