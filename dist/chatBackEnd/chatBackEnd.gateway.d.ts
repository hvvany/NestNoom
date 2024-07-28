import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatRoomService } from "./chatRoom.service";
import { setInitDTO } from "./dto/chatBackEnd.dto";
export declare class ChatBackEndGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly ChatRoomService;
    constructor(ChatRoomService: ChatRoomService);
    server: Server;
    handleJoinRoom(client: Socket, roomName: string): void;
    handleOffer(client: Socket, payload: {
        offer: string;
        roomName: string;
    }): void;
    handleAnswer(client: Socket, payload: {
        answer: string;
        roomName: string;
    }): void;
    handleIce(client: Socket, payload: {
        ice: string;
        roomName: string;
    }): void;
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
