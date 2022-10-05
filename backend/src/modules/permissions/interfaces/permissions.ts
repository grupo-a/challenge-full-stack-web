import { PermissionsInterface } from '../../../models/interfaces/permissions.interface';

export type Permissions = Omit<PermissionsInterface, 'id'>;

export type ListPermissions = PermissionsInterface & {
  createdAt: Date;
  updatedAt: Date;
};
