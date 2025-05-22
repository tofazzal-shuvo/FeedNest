import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthInput } from 'src/types/user';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { PassportLocalGuard } from './guards/passport-local.guard';

@Controller('auth-v2')
export class PassportAuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  @UseGuards(PassportLocalGuard)
  login(@Body() input: AuthInput) {
    return this.authService.authenticateUser(input);
  }
  @Post('register')
  register(@Body() input: AuthInput) {
    return this.userService.register(input);
  }
}
