import { User } from "./User";


export interface AdminUser extends User {
    isAdmin: boolean;
}