import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user';
import { JwtStrategy } from './passport/jwt.strategy';
import { UserAuthController } from './user_auth.controller';
import { UserAuthService } from './user_auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})],
  exports: [TypeOrmModule],
  controllers: [UserAuthController],
  providers: [UserAuthService, JwtStrategy]
})
export class UserAuthModule {}
