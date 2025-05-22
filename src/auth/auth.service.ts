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

  async authenticateUser(authData: AuthInput): Promise<AuthResult> {
    const user = await this.userService.findUserByUsername(authData.username);
    if (!user || user.password !== authData.password) {
      throw new UnauthorizedException();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;
    const accessToken = await this.generateToken(user);
    return { user: rest, accessToken };
  }

  async generateToken(user: User): Promise<string> {
    const accessToken = await this.jwtService.signAsync({
      sub: user.userId,
      username: user.username,
    });
    return accessToken;
  }
}
