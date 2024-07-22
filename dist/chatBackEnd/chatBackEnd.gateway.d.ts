import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatRoomService } from './chatRoom.service';
import { setInitDTO } from './dto/chatBackEnd.dto';
export declare class ChatBackEndGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly ChatRoomService;
    constructor(ChatRoomService: ChatRoomService);
    server: Server;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    sendMessage(client: Socket, message: string): void;
    setInit(client: Socket, data: setInitDTO): setInitDTO;
    setNickname(client: Socket, nickname: string): void;
    getChatRoomList(client: Socket, payload: any): void;
    createChatRoom(client: Socket, roomName: string): {
        roomId: any;
        roomName: string;
    };
    enterChatRoom(client: Socket, roomId: string): {
        roomId: string;
        roomName: string;
    };
}