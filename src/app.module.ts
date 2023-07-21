import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { InfraModule } from './infraproblem/infraproblem.module';
import { AuthModule } from './auth/auth.module';
// import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
})
export class AppModule {}
