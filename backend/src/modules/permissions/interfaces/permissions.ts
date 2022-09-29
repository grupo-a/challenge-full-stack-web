import { PermissionsInterface } from '../../../models/interfaces/permissions.interface';

export type Permissions = Omit<PermissionsInterface, 'id'>;
