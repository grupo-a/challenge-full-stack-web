import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { ICreateStudent } from './interfaces/create-student.interface';
import { IUpdateStudent } from './interfaces/update-student.interface';
import { IPaginatedResponse, IPagination } from 'src/common/dto/pagination.dto';
import { IStudentSearchQuery } from './interfaces/search-student.interface';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async register(createStudent: ICreateStudent): Promise<Student> {
    const existingStudent = await this.studentRepository.findOne({
      where: [
        { email: createStudent.email },
        { ra: createStudent.ra },
        { cpf: createStudent.cpf },
      ],
    });

    if (existingStudent) {
      if (existingStudent.email === createStudent.email) {
        throw new BadRequestException({
          code: 'EMAIL_ALREADY_IN_USE',
          message: 'O e-mail informado já está em uso.',
        });
      }

      if (existingStudent.ra === createStudent.ra) {
        throw new BadRequestException({
          code: 'RA_ALREADY_IN_USE',
          message: 'O RA informado já está em uso.',
        });
      }

      if (existingStudent.cpf === createStudent.cpf) {
        throw new BadRequestException({
          code: 'CPF_ALREADY_IN_USE',
          message: 'O CPF informado já está em uso.',
        });
      }
    }

    const student = this.studentRepository.create(createStudent);
    return this.studentRepository.save(student);
  }

  async update(id: string, updateStudent: IUpdateStudent): Promise<Student> {
    const whereConditions = [];

    updateStudent.email &&
      whereConditions.push({ email: updateStudent.email, id: Not(id) });
    updateStudent.cpf &&
      whereConditions.push({ cpf: updateStudent.cpf, id: Not(id) });

    const existingStudent = whereConditions.length
      ? await this.studentRepository.findOne({ where: whereConditions })
      : null;

    if (existingStudent) {
      if (updateStudent.email === existingStudent.email) {
        throw new BadRequestException({
          code: 'EMAIL_ALREADY_IN_USE',
          message: 'O e-mail informado já está em uso.',
        });
      }
      if (updateStudent.cpf === existingStudent.cpf) {
        throw new BadRequestException({
          code: 'CPF_ALREADY_IN_USE',
          message: 'O CPF informado já está em uso.',
        });
      }
    }

    const student = await this.studentRepository.findOne({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const updatedStudent = await this.studentRepository.save({
      ...student,
      ...updateStudent,
    });

    return updatedStudent;
  }

  async delete(id: string): Promise<void> {
    const student = await this.studentRepository.findOne({ where: { id } });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    await this.studentRepository.remove(student);
  }

  async findAll({
    page = 1,
    limit = 10,
    sort = 'DESC',
    sortBy = 'created_at',
    search,
  }: IStudentSearchQuery): Promise<IPaginatedResponse<Student>> {
    const queryBuilder = this.studentRepository.createQueryBuilder('student');

    if (search) {
      queryBuilder.andWhere(
        `(LOWER(student.name) LIKE LOWER(:search) 
          OR student.ra LIKE :search)`,
        { search: `%${search}%` },
      );
    }

    const [data, total] = await queryBuilder
      .orderBy(`student.${sortBy}`, sort as 'ASC' | 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      total,
      page,
      limit,
      data,
    };
  }
}
