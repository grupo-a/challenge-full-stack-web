import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseFilters,
} from "@nestjs/common";
import { StudentsService } from "./students.service";
import {
  IdentifyStudentDto,
  CreateStudentDto,
  UpdateStudentDto,
} from "./student.dto";
import { Student } from "./student.entity";
import { API_NAMESPACES_ENDPOINTS } from "@shared/constants";
import { StudentExceptionsFilter } from "./student.exception-filer";

@Controller(API_NAMESPACES_ENDPOINTS.STUDENTS)
@UseFilters(new StudentExceptionsFilter())
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get("findAll")
  async getStudentsListHandler(): Promise<Student[]> {
    return this.studentsService.findAll();
  }

  @Get(":id")
  async getStudentHandler(@Param() { id }: IdentifyStudentDto) {
    return this.studentsService.findOne(Number(id));
  }

  @Post()
  async createStudentHandler(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Patch(":id")
  async updateStudentHandler(
    @Param() { id }: IdentifyStudentDto,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(Number(id), updateStudentDto);
  }

  @Delete(":id")
  async removeStudentHandler(@Param() { id }: IdentifyStudentDto) {
    this.studentsService.remove(Number(id));
  }
}
