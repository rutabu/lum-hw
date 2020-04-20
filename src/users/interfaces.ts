export interface User {
  id: number,
  name: string,
  surname: string,
  username: string,
  password: string,
  role: USER_ROLE_TYPE,
}

export type AuthUser = Pick<User, 'id' | 'name' | 'surname' | 'role'>;

export enum USER_ROLE_TYPE {
  ADMIN = 'admin',
  CLIENT = 'client',
}
