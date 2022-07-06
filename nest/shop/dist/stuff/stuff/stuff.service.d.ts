import { AddStuffDto } from 'src/dto/addStuff.dto';
import { ProductDto } from 'src/dto/product.dto';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/users.entity';
import { Response } from 'express';
import { Products } from 'src/entities/products.entity';
import { ProductsDetails } from 'src/entities/products-details.entity';
export declare let photoWell: {
    flag: boolean;
};
export declare class StuffService {
    private products;
    private productsDetails;
    private users;
    constructor(products: Repository<Products>, productsDetails: Repository<ProductsDetails>, users: Repository<Users>);
    getSeason(season: string): string;
    getBodyPart(part: string): string;
    getStuffBy(dataFind: Array<object>, repo: Repository<Products>, data: any): Promise<Products[]>;
    getStuff(season: string, group: string, bodyPart: string, dataFind?: any): Promise<ProductDto[] | {
        err: string;
    }>;
    getDetailsOfProduct(id: number): Promise<object>;
    getPhotosOfProduct(id: number, i: number, res: Response): Promise<void>;
    checkSpecification(specification: Array<{
        name: string;
        value: string;
    }>): {
        name: string;
        value: string;
    }[];
    addStuff(stuff: AddStuffDto, photos: any, token: string): Promise<object>;
}
