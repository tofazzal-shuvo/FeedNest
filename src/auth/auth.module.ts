import { Module } from '@nestjs/common';
import { AuthController } from './auth.contoller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/configs/jwt-secret';
import { PassportModule } from '@nestjs/passport';
import { PassportAuthController } from './passport-auth.contoller';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AuthController, PassportAuthController],
  providers: [AuthService, LocalStrategy],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule,
  ],
})
export class AuthModule {}
