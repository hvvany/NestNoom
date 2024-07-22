"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const chatBackEnd_module_1 = require("./chatBackEnd/chatBackEnd.module");
const chatFrontEnd_module_1 = require("./chatFrontEnd/chatFrontEnd.module");
const cam_front_end_module_1 = require("./cam-front-end/cam-front-end.module");
const cam_back_end_module_1 = require("./cam-back-end/cam-back-end.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            chatBackEnd_module_1.ChatBackEndModule,
            chatFrontEnd_module_1.ChatFrontEndModule,
            cam_front_end_module_1.CamFrontEndModule,
            cam_back_end_module_1.CamBackEndModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map