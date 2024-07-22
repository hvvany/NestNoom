import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class CamBackEndGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    handleConnection(socket: Socket): void;
    handleDisconnect(socket: Socket): void;
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
}
