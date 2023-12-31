import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthDTO } from './auth.dto';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config({path:'../../.env'})

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn({email, password}:AuthDTO) {

    try {
      const user = await this.usersService.findOne(email);
      const passwordCorrect = await bcrypt.compare(password, user.password)
  
      if (!passwordCorrect) {
        return 'Invalid password';
      }
  
      const payload = { username: user.name, email: user.email, id: user.id };
      
      return {
        access_token: await this.jwtService.signAsync(payload),
        id: user.id,
      };
      
    } catch (error) {
      return 'User not found';
    }
  }

  async verifyToken(token:string){
    const bearer = this.extractTokenFromHeader(token);

    if (!bearer) {
      return 'No token';
    }

    try {
      const result = await this.jwtService.verifyAsync(bearer, {secret: process.env.SECRET_KEY});

      return true
    } catch (error) {
      return 'Token not valid';
    }
  }

  private extractTokenFromHeader(bearer:string): string | undefined {
    const [type, token] = bearer.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
}
}