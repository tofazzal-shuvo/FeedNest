import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthenticatedRequest, AuthGuard } from 'src/auth/guards/auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  getCurrentLoggedInUser(@Request() request: AuthenticatedRequest) {
    return this.userService.findCurrentLoggedInUser(request);
  }
}
