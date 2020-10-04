import { Module } from "@nestjs/common";
import { StudentsModule } from "./students.module";
import { StudentsService } from "./students.service";
import { StudentsController } from "./students.controller";

@Module({
  imports: [StudentsModule],
  providers: [StudentsService],
  controllers: [StudentsController],
})
export class StudentHttpModule {}
