import { Server } from 'socket.io';
import { SocketService } from './socket.service';
export declare class SocketGateway {
    private socketService;
    server: Server;
    constructor(socketService: SocketService);
    handleEvent(data: string): void;
}
