import { Request, Response, Router } from 'express';

import LoggerService from '../services/LoggerService';
import AdminUserService from '../services/AdminUserService';
import { AdminUser } from '../domain/models/AdminUser';
import MySQLConnection from '../infra/mysql/MySQLConnection';
import RedisService from '../infra/redis/RedisService';


const adminRouter = Router();
const loggerService = new LoggerService();
const mysqlDataBase = new MySQLConnection(loggerService);
const redisInMemoria = new RedisService(loggerService);
const adminUserService = new AdminUserService(mysqlDataBase, redisInMemoria, loggerService);


adminRouter.post('/', async (req: Request, res: Response) => {
  try {
    const adminUser: AdminUser = {
      name: req.body.name,
      email: req.body.email,
      isAdmin: req.body.isAdmin ? req.body.isAdmin : true,
    };
    const userCreated = await adminUserService.createAdminUser(adminUser);
    res.status(201).json(userCreated);
  } catch (error) {
    loggerService.logError(`Error creating admin user: ${error.message}`);
    res.status(500).json({ message: `Error creating admin user`  });
  }
});


adminRouter.get('/', async (req: Request, res: Response) => {
    try {

      const userAdmin = await adminUserService.listAdminUsers();
      res.status(200).json(userAdmin);
    } catch (error) {
      loggerService.logError(`Error list admin user: ${error.message}`);
      res.status(500).json({ message: "Error list admin user" });
    }
  });

export default adminRouter;
