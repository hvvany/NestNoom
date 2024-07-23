"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatBackEndGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const chatRoom_service_1 = require("./chatRoom.service");
const chatBackEnd_dto_1 = require("./dto/chatBackEnd.dto");
let ChatBackEndGateway = class ChatBackEndGateway {
    constructor(ChatRoomService) {
        this.ChatRoomService = ChatRoomService;
    }
    handleConnection(client) {
        console.log('connected', client.id);
        client.leave(client.id);
        client.data.roomId = `room:lobby`;
        client.join('room:lobby');
    }
    handleDisconnect(client) {
        const { roomId } = client.data;
        if (roomId != 'room:lobby' &&
            !this.server.sockets.adapter.rooms.get(roomId)) {
            this.ChatRoomService.deleteChatRoom(roomId);
            this.server.emit('getChatRoomList', this.ChatRoomService.getChatRoomList());
        }
        console.log('disonnected', client.id);
    }
    sendMessage(client, message) {
        client.rooms.forEach((roomId) => client.to(roomId).emit('getMessage', {
            id: client.id,
            nickname: client.data.nickname,
            message,
        }));
    }
    setInit(client, data) {
        if (client.data.isInit) {
            return;
        }
        client.data.nickname = data.nickname
            ? data.nickname
            : '낯선사람' + client.id;
        client.data.isInit = true;
        return {
            nickname: client.data.nickname,
            room: {
                roomId: 'room:lobby',
                roomName: '로비',
            },
        };
    }
    setNickname(client, nickname) {
        const { roomId } = client.data;
        client.to(roomId).emit('getMessage', {
            id: null,
            nickname: '안내',
            message: `"${client.data.nickname}"님이 "${nickname}"으로 닉네임을 변경하셨습니다.`,
        });
        client.data.nickname = nickname;
    }
    getChatRoomList(client, payload) {
        client.emit('getChatRoomList', this.ChatRoomService.getChatRoomList());
    }
    createChatRoom(client, roomName) {
        if (client.data.roomId != 'room:lobby' &&
            this.server.sockets.adapter.rooms.get(client.data.roomId).size == 1) {
            this.ChatRoomService.deleteChatRoom(client.data.roomId);
        }
        this.ChatRoomService.createChatRoom(client, roomName);
        return {
            roomId: client.data.roomId,
            roomName: this.ChatRoomService.getChatRoom(client.data.roomId)
                .roomName,
        };
    }
    enterChatRoom(client, roomId) {
        if (client.rooms.has(roomId)) {
            return;
        }
        if (client.data.roomId != 'room:lobby' &&
            this.server.sockets.adapter.rooms.get(client.data.roomId).size == 1) {
            this.ChatRoomService.deleteChatRoom(client.data.roomId);
        }
        this.ChatRoomService.enterChatRoom(client, roomId);
        return {
            roomId: roomId,
            roomName: this.ChatRoomService.getChatRoom(roomId).roomName,
        };
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", socket_io_1.Server)
], ChatBackEndGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('sendMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], ChatBackEndGateway.prototype, "sendMessage", null);
__decorate([
    websockets_1.SubscribeMessage('setInit'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, chatBackEnd_dto_1.setInitDTO]),
    __metadata("design:returntype", chatBackEnd_dto_1.setInitDTO)
], ChatBackEndGateway.prototype, "setInit", null);
__decorate([
    websockets_1.SubscribeMessage('setNickname'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], ChatBackEndGateway.prototype, "setNickname", null);
__decorate([
    websockets_1.SubscribeMessage('getChatRoomList'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatBackEndGateway.prototype, "getChatRoomList", null);
__decorate([
    websockets_1.SubscribeMessage('createChatRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], ChatBackEndGateway.prototype, "createChatRoom", null);
__decorate([
    websockets_1.SubscribeMessage('enterChatRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], ChatBackEndGateway.prototype, "enterChatRoom", null);
ChatBackEndGateway = __decorate([
    websockets_1.WebSocketGateway(8081, {
        cors: {
            origin: 'http://localhost:3000',
        },
    }),
    __metadata("design:paramtypes", [chatRoom_service_1.ChatRoomService])
], ChatBackEndGateway);
exports.ChatBackEndGateway = ChatBackEndGateway;
//# sourceMappingURL=chatBackEnd.gateway.js.map