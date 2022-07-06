import { Body, Controller, Get, Header, Options, Post, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Request, Response } from 'express';
import { RegisterDto } from 'src/dto/register.dto';

import { Filter } from 'src/globalFilter/filter';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // sprawdzamy czy uzytkownik to admin
  @Get("/check")
  @UseFilters(new Filter())
  @UseGuards(AuthGuard("jwt"))
  @Header("Access-Control-Allow-Origin", "http://localhost:4200")
  @Header("Access-Control-Allow-Credentials", "true")
  async isAdmin(
    @Req() req: Request,
    ): Promise<any>
  {
    return await this.authService.isAdmin(req);
  }

  // logowanie
  @Post("/login")
  @Header("Access-Control-Allow-Origin", "http://localhost:4200")
  @Header("Access-Control-Allow-Credentials", "true")
  async login(
    @Res() res: Response,
    @Body() user:string
    )
  {
    const _user = JSON.parse(user["user"]);
    return await this.authService.login(_user, res);
  }

  // rejestracja
  @Post("/register")
  @Header("Access-Control-Allow-Origin", "http://localhost:4200")
  @Header("Access-Control-Allow-Credentials", "true")
  async addAccount(
    @Body() account: any
  )
  {
    account = JSON.parse(account.user);
    return await this.authService.register(account);
  }

  @Options("/register")
  @Header("Access-Control-Allow-Origin", "http://localhost:4200")
  @Header("Access-Control-Allow-Credentials", "true")
  register(){}

  // wylogowanie
  @Get("/logout")
  @UseGuards(AuthGuard("jwt"))
  @Header("Access-Control-Allow-Origin", "http://localhost:4200")
  @Header("Access-Control-Allow-Credentials", "true")
  async logout(
    @Req() req: Request,
    @Res() res: Response
  )
  {
    const user = req["user"]["token"];
    return await this.authService.logout(user, res);
  }
}
