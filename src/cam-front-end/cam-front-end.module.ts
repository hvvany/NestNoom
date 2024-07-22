import { Module } from '@nestjs/common';
import { CamFrontEndController } from './cam-front-end.controller';

@Module({
  controllers: [CamFrontEndController]
})
export class CamFrontEndModule {}
