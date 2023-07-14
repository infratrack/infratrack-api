import { Module } from '@nestjs/common';
import { InfraController } from './infraproblem.controller';
import { InfraService } from './infraproblem.service';

@Module({
  controllers: [InfraController],
  providers: [InfraService],
})
export class InfraModule {}