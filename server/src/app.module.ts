import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentHttpModule } from "./students/student-http.module";
import { Student } from "./students/student.entity";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (
        configService: ConfigService<{
          DATABASE_HOST: string;
          DATABASE_PORT: string;
          DATABASE_USER: string;
          DATABASE_PASSWORD: string;
          DATABASE_NAME: string;
        }>,
      ) => {
        const host = configService.get("DATABASE_HOST");
        const port = configService.get("DATABASE_PORT");
        const username = configService.get("DATABASE_USER");
        const password = configService.get("DATABASE_PASSWORD");
        const database = configService.get("DATABASE_NAME");

        return {
          type: "postgres",
          host,
          port,
          username,
          password,
          database,
          entities: [Student],
          keepConnectionAlive: true,
          synchronize: true,
        };
      },
    }),
    StudentHttpModule,
  ],
})
export class AppModule {}
