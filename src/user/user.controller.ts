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
        response.status(403).json(new BadRequestException('Email invalid'));
      }

      response.status(201).json(result)

    } catch (error) {

      response.status(500).json(error);
      
    }

  }

  // TODO: this should be on infraproblems controller
  @Post()
  async SubirTxt(@Req() request: Request, @Res() response: Response){
    // console.log(request.file)
    const {userId, data} = request.body;
    const result = await this.userService.subirImg({userId, data});

    switch (result) {              // SENDING RESPONSE STATUS AND ERRORS
      case true:
        response.status(200).json('Success');
      break;
        
      case 'Missing data':
        response.status(403).json(result);
        break;
        
      case 'Error reading image':
        response.status(403).json(result);
      break;

      case 'Internal Server Error':
        response.status(500).json(result);
      break;
    }

  }
}