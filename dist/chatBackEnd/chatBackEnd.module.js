"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatBackEndModule = void 0;
const common_1 = require("@nestjs/common");
const chatBackEnd_gateway_1 = require("./chatBackEnd.gateway");
const chatRoom_service_1 = require("./chatRoom.service");
let ChatBackEndModule = class ChatBackEndModule {
};
ChatBackEndModule = __decorate([
    common_1.Module({
        providers: [chatBackEnd_gateway_1.ChatBackEndGateway, chatRoom_service_1.ChatRoomService],
    })
], ChatBackEndModule);
exports.ChatBackEndModule = ChatBackEndModule;
//# sourceMappingURL=chatBackEnd.module.js.map