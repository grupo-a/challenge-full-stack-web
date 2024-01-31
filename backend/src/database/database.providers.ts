import { Sequelize } from 'sequelize-typescript';
import { User } from '../app/users/entities/user.entity';
import { sequelizeConnection } from 'src/constants/constants';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from './config';

const models = [User];

const connection = process.env.NODE_ENV === 'test' ? config.test : config.dev;

export const databaseProviders = [
  {
    provide: sequelizeConnection,
    useFactory: async () => {
      const sequelize = new Sequelize(connection as SequelizeModule);
      sequelize.addModels(models);
      await sequelize.sync();
      return sequelize;
    },
  },
];