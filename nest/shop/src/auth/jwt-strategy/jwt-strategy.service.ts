import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Request } from 'express';
import { Strategy } from "passport-jwt";

import { JwtPayload } from "jsonwebtoken";
import { InjectRepository } from '@nestjs/typeorm';

import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

function cookieExtractor(req: Request)
{
    return req?.cookies?.jwt ? req.cookies.jwt: null;
};

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy)
{
    constructor(
        @InjectRepository(Users) private usersRepo: Repository<Users>
    )
    {
        super({
            jwtFromRequest: cookieExtractor,
            secretOrKey: "HKy*&JHF8T8&*(7*&(*^GHFJGfdjky*(y9*68758Fhg*87T8FddsD7877TghJf8&^*76VBHf4"
        });
    }

    async validate(payload: JwtPayload, done: (error, res) => void): Promise<void>
    {
        if(!payload?.id)
        {
            done(new UnauthorizedException(), false);
        };

        const user: Users = await this.usersRepo.findOne({currentToken: payload.id});

        if(!user)
        {
            done(new UnauthorizedException(), false);
        };

        const token: string = user.currentToken;
        done(null, {token: token});
    };
};