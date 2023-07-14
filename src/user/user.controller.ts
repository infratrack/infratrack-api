import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private userService: UserService) {}

//   @HttpCode(HttpStatus.OK)
//   @Post('login')
//   signIn(@Body() signInDto: Record<string, any>) {
//     return this.userService.signIn(signInDto.username, signInDto.password);
//   }
}