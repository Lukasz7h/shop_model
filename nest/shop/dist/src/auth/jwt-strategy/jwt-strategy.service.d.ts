import { Strategy } from "passport-jwt";
import { JwtPayload } from "jsonwebtoken";
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
declare const JwtStrategyService_base: new (...args: any[]) => Strategy;
export declare class JwtStrategyService extends JwtStrategyService_base {
    private usersRepo;
    constructor(usersRepo: Repository<Users>);
    validate(payload: JwtPayload, done: (error: any, res: any) => void): Promise<void>;
}
export {};
