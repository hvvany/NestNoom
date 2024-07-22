import { Module } from '@nestjs/common';
import { ChatBackEndModule } from './chatBackEnd/chatBackEnd.module';
import { ChatFrontEndModule } from './chatFrontEnd/chatFrontEnd.module';
import { CamFrontEndModule } from './cam-front-end/cam-front-end.module';
import { CamBackEndModule } from './cam-back-end/cam-back-end.module';

@Module({
    imports: [
        ChatBackEndModule,
        ChatFrontEndModule,
        CamFrontEndModule,
        CamBackEndModule,
    ],
})
export class AppModule {}
