import { Types } from 'mongoose';
import { User } from '../schema/user.schema';

export class UserResponse {
  readonly _id: Types.ObjectId;

  readonly username: string;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  static build(user: User): UserResponse {
    return {
      _id: user._id,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
