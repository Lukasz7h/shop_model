import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private usersRepo;
    adminSocketID: string;
    constructor(usersRepo: Repository<Users>);
    server: Server;
    users: {};
    getUniqCookie(cookies: string): string;
    isAdmin(cookies: string): Promise<boolean>;
    canWrite: boolean;
    handleConnection(socket: any): Promise<void>;
    handleDisconnect(client: any): void;
    handleMessage(data: string | {
        message: string;
        uniq: string;
    } | [], client: Socket): void;
}
