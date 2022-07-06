import { Body, Controller, Delete, Get, Header, Options, Param, Patch, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Request } from 'express';
import { OrderDataDto } from 'src/dto/orderData.dto';

import { Filter } from 'src/globalFilter/filter';
import { BasketService } from './basket.service';

@Controller('basket')
export class BasketController {

    constructor(
        private basketService: BasketService
    ){}

    @Post("/add")
    @UseGuards(AuthGuard("jwt"))
    @UseFilters(Filter)
    @Header("Access-Control-Allow-Origin", "http://localhost:4200")
    @Header("Access-Control-Allow-Credentials", "true")
    addToBasket(
        @Body() product: any,
        @Req() req: Request
    )
    {
        const token = req["user"]["token"];
        this.basketService.addProduct(product, token);
    }

    @Post("/productCount")
    @UseGuards(AuthGuard("jwt"))
    @UseFilters(Filter)
    @Header("Access-Control-Allow-Origin", "http://localhost:4200")
    @Header("Access-Control-Allow-Credentials", "true")
    changeBasket(
        @Body() productData: any,
        @Req() req: Request
    )
    {
        const token = req["user"]["token"];

        const _productData = JSON.parse(productData.data);
        return this.basketService.changeCountProduct(_productData.product, _productData.count, token);
    }

    @Get("/view")
    @UseGuards(AuthGuard("jwt"))
    @UseFilters(Filter)
    @Header("Access-Control-Allow-Origin", "http://localhost:4200")
    @Header("Access-Control-Allow-Credentials", "true")
    async getProducts(
        @Req() req: Request
    )
    {
        const token = req["user"]["token"];
        return await this.basketService.getProducts(token);
    }

    @Delete("/delete/:productName/:type")
    @UseGuards(AuthGuard("jwt"))
    @UseFilters(Filter)
    @Header("Access-Control-Allow-Origin", "http://localhost:4200")
    @Header("Access-Control-Allow-Credentials", "true")
    async removeFromBasket(
        @Req() req: Request,
        @Param("productName") productName: string,
        @Param("type") type: string
    )
    {
        const token = req["user"]["token"];
        return this.basketService.removeFromBasket(productName, type, token);
    }

    @Options("/delete/:productName/:type")
    @UseFilters(Filter)
    @Header("Access-Control-Allow-Origin", "http://localhost:4200")
    @Header("Access-Control-Allow-Credentials", "true")
    @Header("Access-Control-Allow-Methods", "DELETE")
    cors()
    {}

    @Get("/empty")
    @UseGuards(AuthGuard("jwt"))
    @Header("Access-Control-Allow-Origin", "http://localhost:4200")
    @Header("Access-Control-Allow-Credentials", "true")
    async isBasketEmpty(
        @Req() req: Request
    ): Promise<{isNotEmpty: boolean} | {error: string}>
    {
        return await this.basketService.userBasket(req["user"]["token"]);
    }

    @Get("/paymant/can")
    @UseGuards(AuthGuard("jwt"))
    @Header("Access-Control-Allow-Origin", "http://localhost:4200")
    @Header("Access-Control-Allow-Credentials", "true")
    async can(
        @Req() req: Request
    )
    {
        const jwt = req["user"]["token"];
        return await this.basketService.hasBasketAndOrderData(jwt);
    }

};