import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
export declare class Filter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): Response<any, Record<string, any>>;
}
