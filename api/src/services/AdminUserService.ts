
import { AdminUser } from "../domain/models/AdminUser";
import MySQLConnection from "../infra/mysql/MySQLConnection";
import RedisKeys from "../infra/redis/RedisConstants";
import RedisService from "../infra/redis/RedisService";
import { LoggerService } from "./LoggerService";

export default class AdminUserService {
  private readonly connection: MySQLConnection;
  private readonly loggerService: LoggerService;
  private readonly redisInMemoria: RedisService;

  constructor(connection: MySQLConnection, redisInMemoria: RedisService, loggerService: LoggerService) {
    this.connection = connection;
    this.redisInMemoria = redisInMemoria;
    this.loggerService = loggerService;
  }

  async createAdminUser(adminUser: AdminUser): Promise<AdminUser | object> {
    try {
      const createdAdminUser: AdminUser | object = await this.connection.createAdminUser(adminUser);
      if(createdAdminUser.hasOwnProperty("id")){
        const adminUserObject = createdAdminUser as AdminUser;
        await this.redisInMemoria.saveAdminUser(adminUserObject)
      }
      this.loggerService.logInfo("AdminUser created successfully.");
      return createdAdminUser;
    } catch (error) {
      this.loggerService.logError("Error creating AdminUser: " + error.message);
      throw new Error("Error creating AdminUser.");
    }
  }

  async listAdminUsers(): Promise<AdminUser[] | object> {
    try {

      const cachedAdminUsers = await this.redisInMemoria.getAllAdminUser();

      if (cachedAdminUsers) {
        this.loggerService.logInfo('AdminUsers retrieved from Redis cache.');
        return cachedAdminUsers
      }
      const adminUsers: AdminUser[] | object = await this.connection.listAdminUser();
      this.loggerService.logInfo("AdminUsers listed successfully.");

      if(adminUsers && Array.isArray(adminUsers)){
        const cachedAdminUsers = await this.redisInMemoria.saveAllAdminUser(adminUsers);
        this.loggerService.logInfo(`Users admin saved in Redis`);
      }
      return adminUsers;
    } catch (error) {
      this.loggerService.logError("Error listing AdminUsers: " + error.message);
      throw new Error("Error listing AdminUsers.");
    }
  }

}
