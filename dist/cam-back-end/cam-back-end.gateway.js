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
exports.CamBackEndGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let CamBackEndGateway = class CamBackEndGateway {
    handleConnection(socket) {
        console.log(`Client connected: ${socket.id}`);
    }
    handleDisconnect(socket) {
        console.log(`Client disconnected: ${socket.id}`);
    }
    handleJoinRoom(client, roomName) {
        console.log(roomName);
        client.join(roomName);
        client.to(roomName).emit('welcome');
    }
    handleOffer(client, payload) {
        console.log('offer');
        console.log(payload);
        console.log(payload[0]);
        client.to(payload[1]).emit('offer', payload[0]);
    }
    handleAnswer(client, payload) {
        console.log('answer');
        console.log(payload[0]);
        client.to(payload[1]).emit('answer', payload[0]);
    }
    handleIce(client, payload) {
        console.log('ice');
        client.to(payload[1]).emit('ice', payload[0]);
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", socket_io_1.Server)
], CamBackEndGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('join_room'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], CamBackEndGateway.prototype, "handleJoinRoom", null);
__decorate([
    websockets_1.SubscribeMessage('offer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], CamBackEndGateway.prototype, "handleOffer", null);
__decorate([
    websockets_1.SubscribeMessage('answer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], CamBackEndGateway.prototype, "handleAnswer", null);
__decorate([
    websockets_1.SubscribeMessage('ice'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], CamBackEndGateway.prototype, "handleIce", null);
CamBackEndGateway = __decorate([
    websockets_1.WebSocketGateway(8080, {
        cors: {
            origin: 'http://localhost:3000',
        },
    })
], CamBackEndGateway);
exports.CamBackEndGateway = CamBackEndGateway;
//# sourceMappingURL=cam-back-end.gateway.js.map