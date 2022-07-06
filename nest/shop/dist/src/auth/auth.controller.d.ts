import { Request, Response } from 'express';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    isAdmin(req: Request): Promise<any>;
    login(res: Response, user: string): Promise<any>;
    addAccount(account: any): Promise<any>;
    register(): void;
    logout(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
