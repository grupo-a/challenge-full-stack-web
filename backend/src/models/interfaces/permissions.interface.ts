export interface PermissionsInterface {
  readonly id: string;
  readonly employeeId: any;
  read: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
}
