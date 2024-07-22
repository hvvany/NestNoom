import { Controller, Get, Render } from '@nestjs/common';

@Controller('facetime')
export class CamFrontEndController {
    @Get()
    @Render('face')
    root() {
        return { message: 'Hello world!' };
    }
}
