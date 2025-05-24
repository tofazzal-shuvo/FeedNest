import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/auth/guards/auth.guard';
import { UserService } from './user.service';
import { PassportJwtAuthGuard } from 'src/auth/guards/passport-jwt.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @UseGuards(AuthGuard)
  @UseGuards(PassportJwtAuthGuard)
  @Get('me')
  getCurrentLoggedInUser(@Request() request: AuthenticatedRequest) {
    return this.userService.findCurrentLoggedInUser(request);
  }
}
