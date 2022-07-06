import { UniqCookieService } from './uniq-cookie.service';
import { Response, Request } from "express";
export declare class UniqCookieController {
    private cookieService;
    constructor(cookieService: UniqCookieService);
    uniqCookie(req: Request, res: Response): Response<any, Record<string, any>>;
}
