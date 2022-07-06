import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Request, Response } from 'express';
import { LoginDto } from 'src/dto/login.dto';

import { RegisterDto } from 'src/dto/register.dto';
import { Users } from 'src/entities/users.entity';

import { Repository } from 'typeorm';
import { hashPassword } from './hashPassword';

import { v4 as uuid } from "uuid"
import { JwtPayload, sign } from "jsonwebtoken";

@Injectable()
export class AuthService
{
    constructor(@InjectRepository(Users) private usersRepo: Repository<Users>){};

    // sprawdzamy czy użytkownik jest adminem
    async isAdmin(req: Request)
    {
        const userIsAdmin = async () =>
        {   
            const token: string = req["user"]["token"];
            const user: Users = await this.usersRepo.findOne({currentToken: token});
            return !user.isAdmin? {userCan: false, userLog: true}: {userCan: true, userLog: true};
        };
        return !req.cookies.jwt? {userCan: false, userLog: false}: await userIsAdmin();
    };

    // sprawdzamy dane z 
    checkRegisterData(user: RegisterDto): boolean
    {
        return (user.login.length != 0 && user.login.length < 25) && (user.password.length != 0 && user.password.length < 45);
    };

    // rejestracja użytkownika
    async register(user: RegisterDto): Promise<any>
    {
        try
        {
            const newUser = new Users();
            if(!this.checkRegisterData(user))throw new Error("Invalid register data!");

            if(user.password !== user.r_password) throw new Error("Password is not same");

            newUser.login = user.login;

            user.email? newUser.email = user.email: newUser.email = null;
            user.number? newUser.number = user.number: newUser.number = null;

            const findUser = await this.usersRepo.findOne({login: newUser.login});
            if(findUser){
                return{
                    error: true,
                    addUser: false,
                    message: "Istnieje użytkownik o takim loginie."
                }
            };

            newUser.password = hashPassword(user.password);
            newUser.currentToken = null;
    

            await this.usersRepo.save(newUser);

            return{
                error: false,
                addUser: true
            }
        }
        catch(e)
        {
            return {
                error: e.message
            };
        };
    };

    // tworzyme uniq-id które będzie przypisane do zalogowanego użytkownika i będzie zawarte jwt
    async generateToken(user: Users): Promise<string>
    {
        let currToken: string;
        let thatUser: Users;

        do
        {
            currToken = uuid();
            thatUser = await this.usersRepo.findOne({currentToken: currToken});
        }
        while(!!thatUser);

        await this.usersRepo.update(user.id, {currentToken: currToken});
        return currToken;
    };

    // tworzeni jsonwebtokena
    createToken(token: string)
    {
        const payload: JwtPayload = { id: token };
        const expiresIn: number = 60 * 60 * 24;
        const accessToken = sign(payload, "HKy*&JHF8T8&*(7*&(*^GHFJGfdjky*(y9*68758Fhg*87T8FddsD7877TghJf8&^*76VBHf4", {expiresIn});

        return{
            expiresIn: +new Date() + expiresIn,
            accessToken
        };
    };

    // logowanie użytkownika
    async login(user: LoginDto, response: Response): Promise<any>
    {
        try
        {
            const thatUser = await this.usersRepo.findOne({login: user.login, password: hashPassword(user.password)});
            if(!thatUser)
            {
                throw new UnauthorizedException();
            };

            const currToken = this.createToken(await this.generateToken(thatUser));

            return response.cookie("jwt", currToken.accessToken, {
                domain: "localhost",
                secure: false,
                httpOnly: true
            })
            .json({
                isLog: true
            });
        }
        catch(e)
        {
            return response.json({
                error: e.message
            });
        };
    };

    // wylogowywanie się użytkownika
    async logout(token: string, res: Response)
    {
        try
        {
            const _user = await this.usersRepo.findOne({currentToken: token});

            if(!_user)
            {
                throw new UnauthorizedException();
            };

            _user.currentToken = null;
            await this.usersRepo.update(_user.id, _user);

            return res.clearCookie("jwt", {
                domain: "localhost",
                httpOnly: true,
                secure: false
            })
            .json({
                userCan: false,
                logout: true
            });
        }
        catch(e)
        {
            res.json({
                error: e.message
            })
        }
    }
};