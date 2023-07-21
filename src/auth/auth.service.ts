import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthDTO } from './auth.dto';
import * as bcrypt from 'bcrypt';

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
      };
      
    } catch (error) {
      return 'User not found';
    }
  }
}