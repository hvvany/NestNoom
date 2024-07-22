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
exports.ChatRoomService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let ChatRoomService = class ChatRoomService {
    constructor() {
        this.chatRoomList = {
            'room:lobby': {
                roomId: 'room:lobby',
                roomName: '로비',
                cheifId: null,
            },
        };
    }
    createChatRoom(client, roomName) {
        const roomId = `room:${uuid_1.v4()}`;
        const nickname = client.data.nickname;
        client.emit('getMessage', {
            id: null,
            nickname: '안내',
            message: '"' + nickname + '"님이 "' + roomName + '"방을 생성하였습니다.',
        });
        this.chatRoomList[roomId] = {
            roomId,
            cheifId: client.id,
            roomName,
        };
        client.data.roomId = roomId;
        client.rooms.clear();
        client.join(roomId);
    }
    enterChatRoom(client, roomId) {
        client.data.roomId = roomId;
        client.rooms.clear();
        client.join(roomId);
        const { nickname } = client.data;
        const { roomName } = this.getChatRoom(roomId);
        client.to(roomId).emit('getMessage', {
            id: null,
            nickname: '안내',
            message: `"${nickname}"님이 "${roomName}"방에 접속하셨습니다.`,
        });
    }
    exitChatRoom(client, roomId) {
        client.data.roomId = `room:lobby`;
        client.rooms.clear();
        client.join(`room:lobby`);
        const { nickname } = client.data;
        client.to(roomId).emit('getMessage', {
            id: null,
            nickname: '안내',
            message: '"' + nickname + '"님이 방에서 나갔습니다.',
        });
    }
    getChatRoom(roomId) {
        return this.chatRoomList[roomId];
    }
    getChatRoomList() {
        return this.chatRoomList;
    }
    deleteChatRoom(roomId) {
        delete this.chatRoomList[roomId];
    }
};
ChatRoomService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], ChatRoomService);
exports.ChatRoomService = ChatRoomService;
//# sourceMappingURL=chatRoom.service.js.map