import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/auth/guards/auth.guard';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserResponse } from './dto/user.dto';
import { SignInRequest } from 'src/auth/dto/login-auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(input: SignInRequest): Promise<User> {
    try {
      const newUser = await this.userModel.create(input);
      return newUser;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findUserByUsername(username: string): Promise<User | undefined> {
    try {
      const user = await this.userModel.findOne({ username });
      if (!user) {
        return;
      }
      return user;
    } catch {
      return undefined;
    }
  }

  async findCurrentLoggedInUser(
    request: AuthenticatedRequest,
  ): Promise<UserResponse | undefined> {
    const username = request.user?.username;
    const user = await this.findUserByUsername(username!);
    return UserResponse.build(user!);
  }
}
