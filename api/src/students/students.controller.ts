import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { CreateStudentDto } from './dtos/create-student.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';
import { StudentResponseDto } from './dtos/student-response.dto';
import { PaginatedStudentResponseDto } from './dtos/paginated-students-response.dto';
import { StudentSearchRequestDto } from './dtos/student-search-request.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @ApiCreatedResponse({
    type: PaginatedStudentResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async list(@Query() searchQueryDto: StudentSearchRequestDto) {
    return this.studentsService.findAll(searchQueryDto);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: StudentResponseDto,
  })
  async register(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.register(createStudentDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: StudentResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  async delete(@Param('id') id: string) {
    return this.studentsService.delete(id);
  }
}
