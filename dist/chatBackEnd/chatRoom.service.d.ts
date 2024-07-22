import { chatRoomListDTO } from './dto/chatBackEnd.dto';
import { Socket } from 'socket.io';
export declare class ChatRoomService {
    private chatRoomList;
    constructor();
    createChatRoom(client: Socket, roomName: string): void;
    enterChatRoom(client: Socket, roomId: string): void;
    exitChatRoom(client: Socket, roomId: string): void;
    getChatRoom(roomId: string): chatRoomListDTO;
    getChatRoomList(): Record<string, chatRoomListDTO>;
    deleteChatRoom(roomId: string): void;
}
