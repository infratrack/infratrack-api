import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { InfraService } from './infraproblem.service';

@Controller('auth')
export class InfraController {
  constructor(private infraService: InfraService) {}

//   @HttpCode(HttpStatus.OK)
//   @Post('login')
//   signIn(@Body() signInDto: Record<string, any>) {
//     return this.authService.signIn(signInDto.username, signInDto.password);
//   }
}