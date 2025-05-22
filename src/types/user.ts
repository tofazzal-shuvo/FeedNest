export type AuthInput = {
  username: string;
  password: string;
};

export type AuthResult = {
  user: User;
  accessToken: string;
};

export type User = {
  userId: number;
  username: string;
  password?: string;
};
