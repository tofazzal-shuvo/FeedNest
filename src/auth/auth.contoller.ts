import { Body, Controller, Post } from '@nestjs/common';
import { AuthInput } from 'src/types/user';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  login(@Body() input: AuthInput) {
    return this.authService.jwtAuthentication(input);
  }
  @Post('register')
  register(@Body() input: AuthInput) {
    return this.userService.register(input);
  }
}
