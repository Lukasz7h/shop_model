import { Controller, Get, Header, Req, Res } from '@nestjs/common';
import { UniqCookieService } from './uniq-cookie.service';

import { Response, Request } from "express";

@Controller('uniq-cookie')
export class UniqCookieController
{
    constructor(
        private cookieService: UniqCookieService
    ){}

    @Get("/create")
    @Header("Access-Control-Allow-Origin", "http://localhost:4200")
    @Header("Access-Control-Allow-Credentials", "true")
    uniqCookie(
        @Req() req: Request,
        @Res() res: Response
    )
    {
        return this.cookieService.uniqCookie(req, res);
    }
}