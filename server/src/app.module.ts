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
          DATABASE_URL: string;
        }>,
      ) => {
        const url = configService.get("DATABASE_URL");

        return {
          type: "postgres",
          entities: [Student],
          keepConnectionAlive: true,
          synchronize: true,
          url,
        };
      },
    }),
    StudentHttpModule,
  ],
})
export class AppModule {}
