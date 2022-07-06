import { Request, Response } from 'express';
import { LoginDto } from 'src/dto/login.dto';
import { RegisterDto } from 'src/dto/register.dto';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private usersRepo;
    constructor(usersRepo: Repository<Users>);
    isAdmin(req: Request): Promise<{
        userCan: boolean;
        userLog: boolean;
    }>;
    checkRegisterData(user: RegisterDto): boolean;
    register(user: RegisterDto): Promise<any>;
    generateToken(user: Users): Promise<string>;
    createToken(token: string): {
        expiresIn: number;
        accessToken: any;
    };
    login(user: LoginDto, response: Response): Promise<any>;
    logout(token: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
