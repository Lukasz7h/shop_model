import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AddStuffDto } from 'src/dto/addStuff.dto';
import { ProductDto } from 'src/dto/product.dto';

import { Between, Like, Repository } from 'typeorm';
import { thatGroup } from './group';

import { Users } from 'src/entities/users.entity';
import { checkFiles, getPhotos } from '../fileCheck/fileServ';

import { Response } from 'express';
import { Products } from 'src/entities/products.entity';

import { ProductsDetails } from 'src/entities/products-details.entity';

export let photoWell: {flag: boolean} = {flag: true};

@Injectable()
export class StuffService {
    
    constructor(
        @InjectRepository(Products) private products: Repository<Products>,
        @InjectRepository(ProductsDetails) private productsDetails: Repository<ProductsDetails>,

        @InjectRepository(Users) private users: Repository<Users>,
    ){}

    getSeason(season: string)
    {
        return {spring: "Wiosna", summer: "Lato", fall: "Jesień", winter: "Zima"}[season];
    }

    getBodyPart(part: string)
    {
        return {head: "Głowa", corpus: "Korpus", legs: "Nogi", feet: "Stopy"}[part];
    }

    // pobieramy produkty z bazy danych i zwracamy
    async getStuff(season: string, group: string, bodyPart: string, dataFind = null)
    {
        const _season: string = this.getSeason(season);
        const _bodyPart: string = this.getBodyPart(bodyPart);

        if(!_season)
        {
            return{
                err: "wrong season"
            };
        };

        if(!_bodyPart)
        {
            return{
                err: "wrong part"
            };
        };

        if(!dataFind)
        {
            var res = await this.products.find({
                where: {season: _season, bodyPart: _bodyPart, type: group}
            });
        }
        else
        {
            var res = await this.products.find({
                where: {
                    season: _season, 
                    bodyPart: _bodyPart,
                    type: group,
                    price: Between(dataFind['prop']['price'][0], dataFind['prop']['price'][1]),
                    name: Like(`%${dataFind['prop']['search']}%`)
                }
            });
        };

        let fil: Array<ProductDto> = [];
        res.forEach((e: Products) => {

            e.review?
            fil.push({id: e.id, name: e.name, price: e.price, review: e.review, reviewAmount: e.reviewAmount}):
            fil.push({id: e.id, name: e.name, price: e.price});
        });

        return fil;
    }

    // pobieramy informacje szczegółowe o produkcie i zwracamy
    async getDetailsOfProduct(id: number): Promise<object>
    {
        const product = await this.products.findOne({
            where: {id: id},
            relations: ["detail"]
        });

        let res: any = product;
        if(product.photosName)
        {
            res.getFiles = true;

            const filesCount = product.photosName.split(", ").length;
            res.filesCount = filesCount;
        };

        return res;
    }

    // zwracamy zdjęcia produktów
    async getPhotosOfProduct(id: number, i: number, res: Response)
    {
        const product = await this.products.findOne({
            where: {id: id},
            select: ["photosName"]
        });

        const photosDir = product.photosName;
        const photosArr: string[] = photosDir.split(", ");

        return res.sendFile(photosArr[i],{
            root: "./src/stuff/photos"
        });
    }

    checkSpecification(specification: Array<{name: string, value: string}>)
    {
        return specification.filter(e => e.name !== "" && e.value !== "");
    }

    // dodajemy produkt do bazy danych
    async addStuff(stuff: AddStuffDto, photos, token: string): Promise<object>
    {
        try
        {
            const user = await this.users.findOne({currentToken: token});

            if(!user || !user.isAdmin) throw new UnauthorizedException();
            const hasFiles = "files" in photos? checkFiles(photos): false;

            if(hasFiles)
            {
                var photosArray = getPhotos(photos);
                var productPhotos = photosArray.join(", ");
            };

            let errLen;
            if(
                errLen = stuff.productName.length < 7?
                (stuff.productDescription.length < 40? ["productName", "productDescription"]: "productName"):
                (stuff.productDescription.length < 40? "productDescription": false)
            )
            {
                if(errLen instanceof Array) throw new Error(`{type: len, errLen: [${errLen}]}`);
                throw new Error(`{type: len, errLen: ${errLen}}`);
            }
            else if(stuff.productPrice < 1)
            {
                throw new Error("type: price, errPrice: productPrice");
            }
            else
            {
                const group: string = thatGroup(stuff.productGroup);
                let specification: string | Array<{name: string, value: string}> = this.checkSpecification(stuff.productSpecification);

                specification = specification.length === 0? null: JSON.stringify(specification);
                const newProduct = new Products();

                newProduct.name = stuff.productName;
                newProduct.season = stuff.productSeason;

                newProduct.price = stuff.productPrice;
                newProduct.bodyPart = stuff.productBodyPart;

                newProduct.photosName = productPhotos? productPhotos: null;
                newProduct.type = group;
                
                await this.products.save(newProduct);
                const stuffDetails = new ProductsDetails();

                stuffDetails.description = stuff.productDescription;
                stuffDetails.specification = specification;

                await this.productsDetails.save(stuffDetails);
                newProduct.detail = stuffDetails;

                await this.products.save(newProduct);
                return{
                    add: true
                };
            };
        }
        catch(e)
        {
            return{
                error: e.message
            };
        };
    }

    // dodajemy ocene produktu
    async addStuffReview(productId: number, review: number)
    {
        const stuff = await this.products.findOne({
            id: productId
        });

        stuff.reviewAmount = stuff.reviewAmount + 1;
        const count = stuff.reviewAmount;

        const a = stuff.review == null? stuff.review = review: stuff.review = (stuff.review + review) / count;
        this.products.update(stuff.id, stuff);
    }
}