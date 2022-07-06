/// <reference types="multer" />
import { Request, Response } from 'express';
import { StuffService } from './stuff.service';
export declare class StuffController {
    private stuffServ;
    constructor(stuffServ: StuffService);
    getProducts(season: string, group: string, bodyPart: string, req: Request): Promise<import("../../dto/product.dto").ProductDto[] | {
        err: string;
    }>;
    getProductsOfProperties(season: string, group: string, bodyPart: string, dataPrice: {
        properties: string;
    }): Promise<import("../../dto/product.dto").ProductDto[] | {
        err: string;
    }>;
    withParams(): void;
    getProductDetail(id: number): Promise<object>;
    getProductPhotos(id: number, i: number, res: Response): Promise<void>;
    addStuff(stuff: any, req: Request, photos: Express.Multer.File[]): Promise<object>;
}
