import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8080, {
    cors: {
        origin: 'http://localhost:3000',
    },
})
export class CamBackEndGateway
    implements OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer()
    server: Server;

    handleConnection(socket: Socket) {
        console.log(`Client connected: ${socket.id}`);
    }

    handleDisconnect(socket: Socket) {
        console.log(`Client disconnected: ${socket.id}`);
    }

    @SubscribeMessage('join_room')
    handleJoinRoom(client: Socket, roomName: string): void {
        console.log(roomName);
        client.join(roomName);
        client.to(roomName).emit('welcome');
    }

    @SubscribeMessage('offer')
    handleOffer(
        client: Socket,
        payload: { offer: string; roomName: string },
    ): void {
        console.log('offer');
        console.log(payload);
        console.log(payload.offer);
        client.to(payload.roomName).emit('offer', payload.offer);
    }

    @SubscribeMessage('answer')
    handleAnswer(
        client: Socket,
        payload: { answer: string; roomName: string },
    ): void {
        console.log('answer');
        client.to(payload.roomName).emit('answer', payload.answer);
    }

    @SubscribeMessage('ice')
    handleIce(
        client: Socket,
        payload: { ice: string; roomName: string },
    ): void {
        console.log('ice');
        client.to(payload.roomName).emit('ice', payload.ice);
    }
}
