import { Body, Controller, Get, Header, Options, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { OrderDataDto } from 'src/dto/orderData.dto';
import { UserDataService } from './user-data.service';

import { Request } from 'express';

@Controller('user-data')
export class UserDataController{

    constructor(
        private userDataService: UserDataService
    ){}

    @Post("/order")
    @UseGuards(AuthGuard("jwt"))
    @Header("Access-Control-Allow-Origin", "http://localhost:4200")
    @Header("Access-Control-Allow-Credentials", "true")
    async addOrderData(
        @Body() data: any,
        @Req() req: Request
    )
    {
        const token = req["user"]["token"];
        const orderData: OrderDataDto = JSON.parse(data.orderData);
    
        return await this.userDataService.addOrderData(orderData, token);
    }

    @Get("/orderData")
    @UseGuards(AuthGuard("jwt"))
    @Header("Access-Control-Allow-Origin", "http://localhost:4200")
    @Header("Access-Control-Allow-Credentials", "true")
    async getOrderData(
        @Req() req: Request
    )
    {
        const token = req["user"]["token"];
        return await this.userDataService.getOrderData(token);
    }

    @Get("/bought")
    @UseGuards(AuthGuard("jwt"))
    @Header("Access-Control-Allow-Origin", "http://localhost:4200")
    @Header("Access-Control-Allow-Credentials", "true")
    async isBought(
        @Req() req: Request
    )
    {
        const token = req["user"]["token"];
        return await this.userDataService.getOrderData(token);
    }

    @Patch("/paymant")
    @UseGuards(AuthGuard("jwt"))
    @Header("Access-Control-Allow-Origin", "http://localhost:4200")
    @Header("Access-Control-Allow-Credentials", "true")
    async updatePaymantMethod(
        @Body() method: any,
        @Req() req: Request
    )
    {
        const token = req["user"]["token"];
        method = JSON.parse(method["data"]);

        return await this.userDataService.updateDataOrder(token, method);
    }

    @Options("/paymant")
    @Header("Access-Control-Allow-Origin", "http://localhost:4200")
    @Header("Access-Control-Allow-Credentials", "true")
    @Header("Access-Control-Allow-Methods", "PATCH")
    updatePayman()
    {}

    @Get("/user-bought")
    @UseGuards(AuthGuard("jwt"))
    @Header("Access-Control-Allow-Origin", "http://localhost:4200")
    @Header("Access-Control-Allow-Credentials", "true")
    async userBought(
        @Req() req: Request
    )
    {
        const token: string = req["user"]["token"];
        return await this.userDataService.isBought(token);
    }

    @Post("/add-comment")
    @UseGuards(AuthGuard("jwt"))
    @Header("Access-Control-Allow-Origin", "http://localhost:4200")
    @Header("Access-Control-Allow-Credentials", "true")
    async addComment(
        @Body() commentData: any,
        @Req() req: Request
    )
    {
        const token = req["user"]["token"];

        const comment = JSON.parse(commentData.addComm);
        return await this.userDataService.validComment(comment, token);
    }

    @Options("/add-comment")
    @Header("Access-Control-Allow-Origin", "http://localhost:4200")
    @Header("Access-Control-Allow-Credentials", "true")
    @Header("Access-Control-Allow-Methods", "PATCH, POST, GET")
    updatePaymant()
    {}

    @Get("/comments/:id")
    @Header("Access-Control-Allow-Origin", "http://localhost:4200")
    @Header("Access-Control-Allow-Credentials", "true")
    async getComments(
        @Param("id") id: string
    )
    {
        return await this.userDataService.getComments(id);
    }
}