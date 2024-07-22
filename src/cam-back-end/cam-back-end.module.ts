import { Module } from '@nestjs/common';
import { CamBackEndService } from './cam-back-end.service';
import { CamBackEndGateway } from './cam-back-end.gateway';

@Module({
    providers: [CamBackEndGateway, CamBackEndService],
})
export class CamBackEndModule {}
