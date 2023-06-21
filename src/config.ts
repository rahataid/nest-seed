export const PORT = process.env.PORT || '5500';

export enum ROLES {
  ADMIN = 'admin',
  User = 'user',
}

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}
