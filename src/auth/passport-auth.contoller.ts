import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { AuthenticatedRequest } from './guards/auth.guard';
import { SignInRequest } from './dto/login-auth.dto';

@Controller('auth-v2')
export class PassportAuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(PassportLocalGuard)
  login(@Request() request: AuthenticatedRequest) {
    return this.authService.signIn(request.user!);
  }
  @Post('register')
  register(@Body() input: SignInRequest) {
    return this.authService.signUp(input);
  }
}
