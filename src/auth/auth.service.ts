import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserResponse } from 'src/user/dto/user.dto';
import { SignInRequest, SigninResponse } from './dto/login-auth.dto';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async jwtAuthentication(authData: SignInRequest): Promise<SigninResponse> {
    const user = await this.validateUser(authData);
    if (!user) {
      throw new UnauthorizedException();
    }
    return await this.signIn(user);
  }
  async validateUser(authData: SignInRequest) {
    const user = await this.userService.findUserByUsername(authData.username);
    if (!user) {
      return null;
    }
    return user;
  }
  async signIn(user: User): Promise<SigninResponse> {
    const accessToken = await this.generateToken(user);
    return SigninResponse.build(accessToken, user);
  }

  async signUp(input: SignInRequest) {
    try {
      const user = await this.userService.findUserByUsername(input.username);
      if (user) {
        throw new BadRequestException('User exist with this username.');
      }
      const newUser = await this.userService.createUser(input);
      console.log('user from signup function => ', user);

      return UserResponse.build(newUser);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async generateToken(user: UserResponse): Promise<string> {
    const accessToken = await this.jwtService.signAsync({
      sub: user._id,
      username: user.username,
    });
    return accessToken;
  }
}
