import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

import { take } from "rxjs/operators";
import { AuthService } from "src/app/main/auth/auth.service";

@Injectable()
export class LoginGuard implements CanActivate
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
                    if(e["userLog"])
                    {
                        this.router.navigate([""]);
                        return reject(false);
                    }
                    else
                    {
                        return resolve(true);
                    }
                });
            });
        };

        return await res();
    }
}