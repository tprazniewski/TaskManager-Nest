import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topsecret51',
      signOptions: { expiresIn: 360 },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, UserRepository, JwtStrategy], // to make it avaialble in the module
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule], // we allow any module which imports this module to enjoy/applay this autorization mechanism
})
export class AuthModule {}
