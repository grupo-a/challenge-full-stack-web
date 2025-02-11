import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { CreateTableUsers1738786824962 } from 'migrations/1738786824962-create-table-users';
import { CreateTableStudents1738786827294 } from 'migrations/1738786827294-create-table-students';
import { Student } from './students/entities/student.entity';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    StudentsModule,
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.envConfig.typeormHost,
        port: configService.envConfig.typeormPort,
        database: configService.envConfig.typeormDatabase,
        username: configService.envConfig.typeormUsername,
        password: configService.envConfig.typeormPassword,
        ssl: false,
        entities: [User, Student],
        synchronize: false,
        migrationsRun: true,
        migrations: [
          CreateTableUsers1738786824962,
          CreateTableStudents1738786827294,
        ],
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
