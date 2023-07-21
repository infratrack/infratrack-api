import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import * as dotenv from 'dotenv';
dotenv.config({path:'../../.env'})

@Module({
  imports: [UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '7 days' },
    }),],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
