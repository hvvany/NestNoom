import { Controller, Get, Render } from '@nestjs/common';

@Controller('/chat')
export class ChatFrontEndController {
    @Get()
    @Render('index')
    root() {
        return { message: 'Hello world!' };
    }
}
