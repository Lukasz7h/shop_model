import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
export declare class AuthIntercept implements NestInterceptor {
    intercept(context: ExecutionContext, handler: CallHandler): import("rxjs").Observable<any>;
}
