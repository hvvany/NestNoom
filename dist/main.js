"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const path_1 = require("path");
const app_module_1 = require("./app.module");
const socket_io_adapters_1 = require("./adapters/socket-io.adapters");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useWebSocketAdapter(new platform_socket_io_1.IoAdapter(app));
    app.useWebSocketAdapter(new socket_io_adapters_1.SocketIoAdapter(app));
    app.setBaseViewsDir(path_1.join(__dirname, '..', 'views'));
    app.useStaticAssets(path_1.join(__dirname, '..', 'public'));
    app.setViewEngine('ejs');
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map