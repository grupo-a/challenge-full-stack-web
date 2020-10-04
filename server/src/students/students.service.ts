import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Student } from "./student.entity";

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private usersRepository: Repository<Student>,
  ) {}

  findAll(): Promise<Student[]> {
    return this.usersRepository.find();
  }

  create(student: Omit<Student, "id">) {
    return this.usersRepository.save(student);
  }

  update(id: number, student: Partial<Student>) {
    return this.usersRepository.update({ id }, student);
  }

  findOne(id: number): Promise<Student> {
    return this.usersRepository.findOne({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete({ id });
  }
}
