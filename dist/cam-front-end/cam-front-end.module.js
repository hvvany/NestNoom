"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CamFrontEndModule = void 0;
const common_1 = require("@nestjs/common");
const cam_front_end_controller_1 = require("./cam-front-end.controller");
let CamFrontEndModule = class CamFrontEndModule {
};
CamFrontEndModule = __decorate([
    common_1.Module({
        controllers: [cam_front_end_controller_1.CamFrontEndController]
    })
], CamFrontEndModule);
exports.CamFrontEndModule = CamFrontEndModule;
//# sourceMappingURL=cam-front-end.module.js.map