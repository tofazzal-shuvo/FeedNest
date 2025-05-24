import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthInput, AuthResult, User } from 'src/types/user';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async jwtAuthentication(authData: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(authData);
    if (!user) {
      throw new UnauthorizedException();
    }
    const authResult = await this.SigIn(user);
    return authResult;
  }
  async validateUser(authData: AuthInput) {
    const user = await this.userService.findUserByUsername(authData.username);
    if (user && user.password === authData.password) {
      return {
        userId: user.userId,
        username: user.username,
      };
    }
    return null;
  }
  async SigIn(user: User) {
    const accessToken = await this.generateToken(user);
    return { user, accessToken };
  }

  async generateToken(user: User): Promise<string> {
    const accessToken = await this.jwtService.signAsync({
      sub: user.userId,
      username: user.username,
    });
    return accessToken;
  }
}
