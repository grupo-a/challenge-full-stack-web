import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [__dirname + '/**/*.entity.ts'],
    } as SequelizeModule),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
