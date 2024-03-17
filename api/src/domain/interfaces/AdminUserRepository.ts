import { AdminUser } from "../models/AdminUser";


export interface AdminUserRepository {
    createAdminUser(adminUser: AdminUser): Promise<AdminUser | object>;
    listAdminUser(): Promise<AdminUser[] | object>;
  }