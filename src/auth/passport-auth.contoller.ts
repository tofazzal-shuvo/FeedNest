import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthInput } from 'src/types/user';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { AuthenticatedRequest } from './guards/auth.guard';

@Controller('auth-v2')
export class PassportAuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  @UseGuards(PassportLocalGuard)
  login(@Request() request: AuthenticatedRequest) {
    return this.authService.SigIn(request.user!);
  }
  @Post('register')
  register(@Body() input: AuthInput) {
    return this.userService.register(input);
  }
}
