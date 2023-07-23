import { BadRequestException, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  async createUser(@Req() request: Request, @Res() response: Response) {
    
    try {
      
      const {name, email, password} = request.body;

      const result = await this.userService.createUser({name, email, password});

      if(result == 'Email invalid'){
        response.status(403).send(new BadRequestException('Email invalid'));
      }

      response.status(201).send(result)

    } catch (error) {

      response.status(500).send(error);
      
    }

  }

  // @UseGuards(AuthGuard)
  // @Get()
  // async getOi(){
  //   return 'oi'
  // }

  @Get()
  async SubirTxt(){
    return this.userService.subirImg('agr.txt', 'oi');
  }

  // @HttpCode(HttpStatus.OK)
  // @Post('/login')
  // async login(@Req() request: Request, @Res() response: Response) {

  //   try {

  //     const {email, password} = request.body
  //     const result = await this.userService.login({email, password});

  //     response.send(result)


      
  //   } catch (error) {
      
  //   }
  // }
}