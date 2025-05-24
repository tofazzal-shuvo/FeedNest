import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequest } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() input: SignInRequest) {
    return this.authService.jwtAuthentication(input);
  }
  @Post('register')
  register(@Body() input: SignInRequest) {
    return this.authService.signUp(input);
  }
}
