import { Request } from "express";
export declare let filesArr: {
    files: any[];
};
export declare function filterForFilesOfProducts(req: Request, file: any, call: (error: any, data: any) => void): Promise<void>;
