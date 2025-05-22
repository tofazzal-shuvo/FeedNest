/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/auth/guards/auth.guard';
import { AuthInput, User } from 'src/types/user';

@Injectable()
export class UserService {
  private users: User[] = [
    { userId: 1, username: 'Hasibul', password: '123' },
    { userId: 2, username: 'Saber', password: '123' },
  ];

  async register(input: AuthInput): Promise<User | undefined> {
    const user = { ...input, userId: this.users.length + 1 };
    this.users.push(user);
    return user;
  }

  async findUserByUsername(username: string): Promise<User | undefined> {
    const user = this.users.find((item: User) => item.username === username);
    return user;
  }

  async findCurrentLoggedInUser(
    request: AuthenticatedRequest,
  ): Promise<User | undefined> {
    const username = request.user?.username;
    const user = this.users.find((item: User) => item.username === username);
    delete user?.password;
    return user;
  }
}
