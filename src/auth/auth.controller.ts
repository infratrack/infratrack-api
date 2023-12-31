import { Controller, Post, HttpCode, HttpStatus, Res, Req, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async signIn(@Req() request: Request, @Res() response: Response) {
    try {
      const {email, password} = request.body;

      const result = await this.authService.signIn({email, password});

      if(result == 'Invalid password') {
        response.status(400).send(new UnauthorizedException(result));
      } else if(result == 'User not found') {
        response.status(400).send(new BadRequestException(result));
      }

      response.status(200).json(result);

    } catch (error) {
      response.status(500).send(error.message);
    }
    return 'oi'
  }

  @HttpCode(HttpStatus.OK)
  @Post('/verify')
  async verify(@Req() request: Request, @Res() response: Response) {
    try {
      const {token} = request.body;

      const result = await this.authService.verifyToken(token);

      if (result == 'No token'){
        response.status(403).send(new BadRequestException)
      }
      if (result == 'Token not valid'){
        response.status(401).send(new UnauthorizedException)
      }

      response.status(200).json(result)

    } catch (error) {
      response.status(500).json(error.message)
    }
  }
}