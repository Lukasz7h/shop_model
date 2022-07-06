import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { Response, Request } from "express";

@Injectable()
export class UniqCookieService
{
    // tworzymy unikalne ciasteczko
    uniqCookie(req: Request, res: Response)
    {
        const regExp = new RegExp("uniq");

        if(!regExp.exec(req.headers["cookie"]))
        {
            const date = new Date();
            date.setDate(date.getDate() + 1);

            res.cookie("uniq", v4(), {
                httpOnly: true,
                expires: date,
                sameSite: true
            });
        };

        return res.send();
    }
}