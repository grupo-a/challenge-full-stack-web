import { NextFunction, Request, Response } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import StudentRepository from '../repositories/studentRepository';
import createStudentValidator from '../validators/createStudentValidator';
import updateStudentValidator from '../validators/updateStudentValidator';

class StudentController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { search } = request.query;
      const repository = getCustomRepository(StudentRepository);
      const students = await repository.list(search as string);

      return response.json(students);
    } catch (error) {
      next(error);
    }
  }

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

  async show(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
      const repository = getCustomRepository(StudentRepository);

      const student = await repository.findOne(id);

      if (!student) {
        return response.status(404).json('Aluno não encontrado');
      }

      return response.json(student);
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
      const data = {
        name: request.body.name,
        email: request.body.email,
      };

      await updateStudentValidator.validate(data, {
        abortEarly: false,
      });

      const repository = getCustomRepository(StudentRepository);
      await repository.update(id, data);

      return response.json('ok');
    } catch (error) {
      next(error);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
      const repository = getCustomRepository(StudentRepository);

      const student = await repository.findOne(id);
      if (!student) {
        return response.status(404).json('Aluno não encontrado');
      }

      await repository.delete(id);

      return response.json('ok');
    } catch (error) {
      next(error);
    }
  }
}

export default new StudentController();
