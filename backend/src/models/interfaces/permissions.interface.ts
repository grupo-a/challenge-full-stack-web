export interface PermissionsInterface {
  readonly id: string;
  readonly employeeId: string;
  read: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
}
