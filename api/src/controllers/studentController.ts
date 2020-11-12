import { NextFunction, Request, Response } from 'express';
import { nextTick } from 'process';
import { getCustomRepository } from 'typeorm';
import StudentRepository from '../repositories/studentRepository';
import createStudentValidator from '../validators/createStudentValidator';

class StudentController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const data = {
        name: request.body.name,
        email: request.body.email,
        ra: request.body.ra,
        cpf: request.body.cpf,
      };

      await createStudentValidator.validate(data, {
        abortEarly: false,
      });

      const respository = getCustomRepository(StudentRepository);

      const student = respository.create(data);
      await respository.save(student);

      return response.status(201).json('ok');
    } catch (error) {
      next(error);
    }
  }
}

export default new StudentController();
