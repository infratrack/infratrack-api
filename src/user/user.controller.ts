import { BadRequestException, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';

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
        response.status(403).json(new BadRequestException('Email invalid'));
      }

      response.status(201).json(result)

    } catch (error) {

      response.status(500).json(error);
      
    }

  }

}