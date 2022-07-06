import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { decode } from "jsonwebtoken";
import { InjectRepository } from '@nestjs/typeorm';

import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@WebSocketGateway(700)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect
{
  adminSocketID: string;

  constructor(
    @InjectRepository(Users) private usersRepo: Repository<Users>
  ){}

  @WebSocketServer()
  server: Server;

  users = {};

  // pobieramy ciasteczko 'uniq'
  getUniqCookie(cookies: string)
  {
    const arrayCookies: string[] = cookies.split("; ");
    const uniq = arrayCookies.find((e) => e.includes("uniq")).split("=")[1];

    return uniq;
  }

  // sprawdzamy czy użytkownik jest adminem
  async isAdmin(cookies: string)
  {
    if(!cookies) return false;
    const arrayCookies: string[] = cookies.split("; ");
    const jwt = arrayCookies.find((e) => e.includes("jwt"));

    if(jwt)
    {
      const jwtValue = jwt.split("=")[1];
      const token = decode(jwtValue)["id"];

      const admin = await this.usersRepo.findOne({
        currentToken: token,
        isAdmin: true
      });

      return !!admin;
    };

    return false;
  }

  canWrite: boolean = false;

  // użytkownik połączył się z socketem
  async handleConnection(socket: any)
  {
    const admin = await this.isAdmin(socket.handshake.headers.cookie);
    const uniqCookie = this.getUniqCookie(socket.handshake.headers.cookie);

    const user = this.users[`${uniqCookie}`];

    if(!user){

      Object.defineProperty(this.users, `${uniqCookie}`, {
        value: {socketID: socket.id, admin, chat: []},
        enumerable: true
      });
    }
    else
    {
      user.socketID = socket.id;
      user.admin = admin;
      var allChat = [];

      if(user.admin)
      {
        for(let user in this.users)
        {
          allChat.push({message: this.users[`${user}`].chat, uniq: user});
        };
      }
      else
      {
        allChat.push(user.chat);
      };

    };

    if(admin)
    {
      this.canWrite = true;
      this.adminSocketID = socket.id;
    };

    const send = {canWrite: this.canWrite};
    
    this.server.emit("connection", {canWrite: this.canWrite});
    if(allChat) socket.emit("message", {chat: {messages: allChat}});
  }

  // użytkownik rozłączył się z socketem
  handleDisconnect(client: any)
  {
    const uniqCookie = this.getUniqCookie(client.handshake.headers.cookie);
    const user = this.users[`${uniqCookie}`];

    setTimeout(() => {

      const user = this.users[`${uniqCookie}`];
      delete this.users[`${user}`];

      let flag = false;
      for(let e in this.users)
      {
        if(this.users[e].admin) {
          flag = true;
          break;
        };
      };

      this.canWrite = flag;

      if(!this.canWrite) this.server.emit("connection", {canWrite: this.canWrite});
    }, 4500);
  }

  // nasłuchiwanie wiadomości wysłanych przez użytkownika
  @SubscribeMessage("message")
  handleMessage(
    @MessageBody() data: string | {message: string, uniq: string} | [],
    @ConnectedSocket() client: Socket
  )
  {
    const uniqCookie = this.getUniqCookie(client.handshake.headers.cookie);
    const user = this.users[`${uniqCookie}`];

    function sendData(isAdmin: boolean)
    {

      this.server.sockets.fetchSockets()
      .then((e) => {
        e.forEach((socket) => {

          if(!isAdmin && socket.id == this.adminSocketID)
          {
            socket.emit("message", {uniq: uniqCookie, message: data}),
            user.chat.push({customer: true, message: data});
          }
          else if(isAdmin)
          {
            const socketID = this.users[`${data["uniq"]}`].socketID;

            if(socket.id == socketID)
            {
              const user = this.users[`${data["uniq"]}`];

              socket.emit("message", data['message']);
              user.chat.push({customer: false, message: data["message"]});
            };
          };

        });
      });

    };

    sendData.bind(this, user.admin)();
  };
}
