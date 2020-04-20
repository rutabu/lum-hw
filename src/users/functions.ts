import { AuthUser, USER_ROLE_TYPE } from './interfaces';

export function getUserRole(authUser?: AuthUser): USER_ROLE_TYPE | undefined {
  const { role } = authUser || { role: undefined };

  return role as USER_ROLE_TYPE;
}

export function getUserId(authUser?: AuthUser): number | undefined {
  const { id } = authUser || { id: undefined };

  return id;
}

export function isUserClient(authUser?: AuthUser): boolean {
  const role = getUserRole(authUser);

  return role === USER_ROLE_TYPE.CLIENT;
}

export function isUserAdmin(authUser?: AuthUser): boolean {
  const role = getUserRole(authUser);

  return role === USER_ROLE_TYPE.ADMIN;
}
