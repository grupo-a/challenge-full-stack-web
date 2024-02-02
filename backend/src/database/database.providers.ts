import { Sequelize } from 'sequelize-typescript';
import { User } from '../app/users/entities/user.entity';
import { sequelizeConnection } from '../constants/constants';
import { SequelizeModule } from '@nestjs/sequelize';
import config from './config';

const models = [User];

export const databaseProviders = [
  {
    provide: sequelizeConnection,
    useFactory: async () => {
      const connection = process.env.DB_VENDOR;
      let configSequelize: SequelizeModule;

      if (!connection) {
        throw new Error('DB_VENDOR not defined');
      }

      if (connection === 'dev')
        configSequelize = config.dev;

      if (connection === 'prod')
        configSequelize = config.prod;

      const sequelize = new Sequelize(configSequelize as SequelizeModule);
      sequelize.addModels(models);
      await sequelize.sync();
      return sequelize;
    },
  },
];