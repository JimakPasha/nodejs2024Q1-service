export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export type NewUser = Omit<User, 'id'>;

export type UpdatedUser = Omit<User, 'createdAt'>;

export type ResponseUser = Omit<User, 'password'>;
