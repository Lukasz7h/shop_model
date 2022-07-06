import { Body, Controller, Get, Header, Options, Param, ParseIntPipe, Post, Req, Res, UploadedFiles, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { Request, Response } from 'express';
import { AddStuffDto } from 'src/dto/addStuff.dto';

import { StuffService } from './stuff.service';
import { AuthGuard } from '@nestjs/passport';

import { Filter } from 'src/globalFilter/filter';

@Controller('stuff')
export class StuffController {

    constructor(
        private stuffServ: StuffService
    ){}

    // zwracamy produkty adekwatne do wyszukiwań
    @Get("/sezon/:period/:group/:bodyPart")
    @Header("Access-Control-Allow-Origin", "http://localhost:4200")
    @Header("Access-Control-Allow-Credentials", "true")
    async getProducts(
        @Param("period") season: string,
        @Param("group") group: string,
        @Param("bodyPart") bodyPart: string,
        @Req() req: Request
    )
    {
        return await this.stuffServ.getStuff(season, group, bodyPart);
    }

    // zwracamy produkty adekwatne do wyszukiwań (w tym rządaniu użytkownik wysłał także dodatkowe parametry które przedmiotu muszą posiadać)
    @Post("/sezon/:period/:group/:bodyPart")
    @Header("Access-Control-Allow-Origin", "http://localhost:4200")
    @Header("Access-Control-Allow-Credentials", "true")
    async getProductsOfProperties(
        @Param("period") season: string,
        @Param("group") group: string,
        @Param("bodyPart") bodyPart: string,
        @Body() dataPrice: {properties: string}
    )
    { 
        dataPrice = JSON.parse(dataPrice.properties);
        return await this.stuffServ.getStuff(season, group, bodyPart, dataPrice);
    }

    // zwracamy informacje szczegółowe o produktach
    @Options("/sezon/:period/:group/:bodyPart")
    @Header("Access-Control-Allow-Origin", "http://localhost:4200")
    @Header("Access-Control-Allow-Credentials", "true")
    withParams(){}

    @Get("/detail/:id")
    @Header("Access-Control-Allow-Origin", "http://localhost:4200")
    @Header("Access-Control-Allow-Credentials", "true")
    async getProductDetail(
        @Param("id", ParseIntPipe) id: number
    )
    {
        return await this.stuffServ.getDetailsOfProduct(id);
    }

    // zwracamy zdjęcia produktu
    @Get("/detail/photos/:id/:i")
    @UseFilters(new Filter())
    @Header("Access-Control-Allow-Origin", "http://localhost:4200")
    @Header("Access-Control-Allow-Credentials", "true")
    async getProductPhotos(
        @Param("id", ParseIntPipe) id: number,
        @Param("i", ParseIntPipe) i: number,
        @Res() res: Response
    )
    {
        return await this.stuffServ.getPhotosOfProduct(id, i, res);
    }

    // dodajemy produkt do bazy danych
    @Post("/add")
    @UseGuards(AuthGuard("jwt"))
    @UseInterceptors(
        FileFieldsInterceptor([
            {name: "files"}
        ])
    )
    @Header("Access-Control-Allow-Origin", "http://localhost:4200")
    @Header("Access-Control-Allow-Credentials", "true")
    async addStuff(
        @Body() stuff: any,
        @Req() req: Request,
        @UploadedFiles() photos: Express.Multer.File[]
    )
    {
        const _stuff: AddStuffDto = JSON.parse(stuff.productData);
        const token = req["user"]['token'];

        return await this.stuffServ.addStuff(_stuff, photos, token);
    }

}