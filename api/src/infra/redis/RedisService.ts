
import * as redis from 'redis';
import LoggerService from '../../services/LoggerService';
import { AdminUser } from '../../domain/models/AdminUser';
import { Student } from '../../domain/models/Student';
import  RedisKeys  from "./RedisConstants"



export default class RedisService {
  private client: redis.RedisClientType;
  private loggerService: LoggerService;
  private readonly EXPIRATION_TIME = 24 * 60 * 60;

  constructor(loggerService: LoggerService) {
    
    this.loggerService = loggerService;

    this.client = redis.createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
    });

    this._connect();
  
  }

  private async _connect() {
    this.client.on('connect', () => {
      this.loggerService.logInfo('Connected to Redis.');
    });

    this.client.on('reconnecting', () => {
      this.loggerService.logInfo('Reconnecting to Redis...');
    });

    this.client.on('end', () => {
      this.loggerService.logInfo('Redis connection closed.');
    });

    this.client.on('ready', () => {
      this.loggerService.logInfo('Redis is ready.');
    });

    this.client.on('warning', (warning) => {
      this.loggerService.logWarning('Redis warning: ' + warning);
    });

    this.client.on('close', () => {
      this.loggerService.logInfo('Redis connection closed.');
    });

    this.client.on('error', (err) => {
      this.loggerService.logError('Error connecting to Redis:' + err);
    });

    await this.client.connect()
  }


  async saveAdminUser(user: AdminUser): Promise<void> {
    const key = `${RedisKeys.ADMIN_USER}:${user.id}`;
    const serializedUser = JSON.stringify(user);
    await this.client.setEx(key, this.EXPIRATION_TIME, serializedUser);
  }

  async getAdminUser(userId: string): Promise<AdminUser | null> {
    const key = `${RedisKeys.ADMIN_USER}:${userId}`;
    const serializedUser = await this.client.get(key);
    if (!serializedUser) return null;
    return JSON.parse(serializedUser) as AdminUser;
  }

  async saveAllAdminUser(user): Promise<void> {
    const key = RedisKeys.ADMIN_USER_ALL;
    const serializedUser = JSON.stringify(user);
    await this.client.setEx(key, this.EXPIRATION_TIME, serializedUser);
  }

  async getAllAdminUser(): Promise<AdminUser | null> {
    const key = RedisKeys.ADMIN_USER_ALL;
    const serializedUser = await this.client.get(key);
    if (!serializedUser) return null;
    return JSON.parse(serializedUser) as AdminUser;
  }


  async saveStudentUser(user): Promise<void> {
    const key = `${RedisKeys.STUDENT_USER}:${user.id}`;
    const serializedUser = JSON.stringify(user);
    await this.client.setEx(key, this.EXPIRATION_TIME, serializedUser);
  }

  async getStudentUser(userId: string): Promise<Student | null> {
    const key = `${RedisKeys.STUDENT_USER}:${userId}`;
    const serializedUser = await this.client.get(key);
    if (!serializedUser) return null;
    return JSON.parse(serializedUser) as Student;
  }

  async saveAllStudentUser(user): Promise<void> {
    const key = RedisKeys.STUDENT_USER_ALL;
    const serializedUser = JSON.stringify(user);
    await this.client.setEx(key, this.EXPIRATION_TIME, serializedUser);
  }

  async getAllStudentUser(): Promise<Student | null> {
    const key = RedisKeys.STUDENT_USER_ALL;
    const serializedUser = await this.client.get(key);
    if (!serializedUser) return null;
    return JSON.parse(serializedUser) as Student;
  }

  async deleteStudent(userId: string): Promise<void> {
    try {
      const key = `${RedisKeys.STUDENT_USER}:${userId}`;
      await this.client.del(key);
      this.loggerService.logInfo(`Student with ID ${userId} deleted from Redis.`);
    } catch (error) {
      this.loggerService.logError(`Error deleting student from Redis: ${error.message}`);
      throw new Error(`Error deleting student from Redis: ${error.message}`);
    }
  }

}
