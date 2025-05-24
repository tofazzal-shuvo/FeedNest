/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsStrongPassword } from 'class-validator';
import { UserResponse } from 'src/user/dto/user.dto';
import { User } from 'src/user/schema/user.schema';

export class SignInRequest {
  @IsString()
  username: string;
  @IsStrongPassword()
  password: string;
}

export class SigninResponse {
  @IsString()
  accessToken: string;

  user: UserResponse;

  static build(token: string, user: User): SigninResponse {
    return {
      accessToken: token,
      user: UserResponse.build(user),
    };
  }
}
