import { ArgumentsHost, Catch, ExceptionFilter, Redirect, UnauthorizedException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class Filter implements ExceptionFilter
{
    catch(exception: unknown, host: ArgumentsHost)
    {
        const res: Response = host.switchToHttp().getResponse();
        const req: Request = host.switchToHttp().getRequest();

        res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE")

        return res.json({
            userCan: false,
            userLog: false
        });
    }
}