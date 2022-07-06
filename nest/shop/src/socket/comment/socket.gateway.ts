import { MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway()
export class SocketGateway
{

  @WebSocketServer()
  server: Server;

  constructor(private socketService: SocketService) {}

  // wysyłamy wiadmoość treść do użytkowników (komentarz do produktu)
  @SubscribeMessage("message")
  handleEvent(@MessageBody() data: string)
  {
    this.server.emit("message", data)
  }

}