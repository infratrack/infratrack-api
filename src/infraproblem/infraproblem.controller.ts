import { Body, Controller, Post, HttpCode, HttpStatus, Req, Res, UseGuards, Get, Param } from '@nestjs/common';
import { InfraService } from './infraproblem.service';
import { Request, Response } from 'express';
import { InfraProblemDTO } from './infraproblem.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('problem')
export class InfraController {
  constructor(private infraService: InfraService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/create')
  async createProblem(@Req() request: Request, @Res() response: Response){

    try {
      const {problem, problemTitle, description, location, idRelator, type }:InfraProblemDTO = request.body;
  
      const result = await this.infraService.createProblem({problem, idRelator, location, problemTitle, type, description});
  
      // switch (result) {              // SENDING RESPONSE STATUS AND ERRORS
      //   default:
      //     response.status(200).json('Success');
      //   break;
      if(typeof(result) === 'string'){
        response.status(200).json('Success');
      }
      console.log(result);

      response.status(500).json('Error');
        // case 'Missing data':
        //   response.status(403).json(result);
        //   break;
          
        // case 'Error reading image':
        //   response.status(403).json(result);
        // break;
  
        // case 'Internal Server Error':
        //   response.status(500).json(result);
        // break;
      // }
      
    } catch (error) {
      response.status(500).json('Internal Server Error');
    }

  }

  @Get()
  async getAllProblems(@Req() request: Request, @Res() response: Response){
    const problems = await this.infraService.getAllProblems()
    response.status(200).json(problems)
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserProblems(@Param('id') id: string, @Req() request: Request, @Res() response: Response){
    const problems = await this.infraService.getUserProblems(id)
    response.status(200).json(problems)
  }
  
}