import { PermissionsInterface } from '../../../models/interfaces/permissions.interface';

export type CreatePermissions = Omit<PermissionsInterface, 'id'>;
