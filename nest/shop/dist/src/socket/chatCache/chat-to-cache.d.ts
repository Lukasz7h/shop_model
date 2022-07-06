import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
export declare class ChatCache implements NestInterceptor {
    private reflector;
    constructor(reflector: Reflector);
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>;
}
