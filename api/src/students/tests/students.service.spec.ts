import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './../students.service';
import { Student } from './../entities/student.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';

describe('StudentsService', () => {
  let studentsService: StudentsService;
  let studentRepository: Repository<Student>;

  const mockStudent: Student = {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    ra: faker.string.numeric(6),
    cpf: faker.string.numeric(11),
    name: faker.person.fullName(),
  } as Student;

  const mockStudentRepository = {
    findOne: jest.fn(),
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockResolvedValue(mockStudent),
    remove: jest.fn().mockResolvedValue(undefined),
    findAndCount: jest.fn().mockResolvedValue([[mockStudent], 1]),
    createQueryBuilder: jest.fn().mockReturnValue({
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([[mockStudent], 1]),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: getRepositoryToken(Student),
          useValue: mockStudentRepository,
        },
      ],
    }).compile();

    studentsService = module.get<StudentsService>(StudentsService);
    studentRepository = module.get<Repository<Student>>(
      getRepositoryToken(Student),
    );
  });

  it('should be defined', () => {
    expect(studentsService).toBeDefined();
    expect(studentRepository).toBeDefined();
  });

  describe('register', () => {
    it('should create a student successfully', async () => {
      mockStudentRepository.findOne.mockResolvedValue(null);
      const result = await studentsService.register(mockStudent);

      expect(result).toEqual(mockStudent);
      expect(studentRepository.create).toHaveBeenCalledWith(mockStudent);
      expect(studentRepository.save).toHaveBeenCalled();
    });

    it('should throw an error if email is already in use', async () => {
      mockStudentRepository.findOne.mockResolvedValue(mockStudent);
      await expect(
        studentsService.register({
          ...mockStudent,
          ra: '123456',
          cpf: '12345678901',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw an error if RA is already in use', async () => {
      mockStudentRepository.findOne.mockResolvedValue({
        name: 'Name',
        ra: 'ra-1',
        email: 'email-1@test.com',
        cpf: 'cpf-1',
      });
      await expect(
        studentsService.register({
          name: 'Name',
          ra: 'ra-1',
          email: 'email-2@test.com',
          cpf: 'cpf-2',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw an error if CPF is already in use', async () => {
      mockStudentRepository.findOne.mockResolvedValue({
        name: 'Name',
        ra: 'ra-1',
        email: 'email-1@test.com',
        cpf: 'cpf-1',
      });
      await expect(
        studentsService.register({
          name: 'Name',
          ra: 'ra-2',
          email: 'email-2@test.com',
          cpf: 'cpf-1',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('should update a student successfully', async () => {
      mockStudentRepository.findOne.mockResolvedValue(mockStudent);
      const result = await studentsService.update(mockStudent.id, {
        email: 'new@example.com',
      });

      expect(result).toEqual(mockStudent);
      expect(studentRepository.save).toHaveBeenCalled();
    });

    it('should throw an error if student not found', async () => {
      mockStudentRepository.findOne.mockResolvedValue(null);
      await expect(
        studentsService.update(mockStudent.id, { email: 'new@example.com' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw an error if email is already in use', async () => {
      mockStudentRepository.findOne.mockResolvedValue({
        ...mockStudent,
        id: 'another-id',
      });
      await expect(
        studentsService.update(mockStudent.id, { email: mockStudent.email }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw an error if CPF is already in use', async () => {
      mockStudentRepository.findOne.mockResolvedValue({
        ...mockStudent,
        id: 'another-id',
      });
      await expect(
        studentsService.update(mockStudent.id, { cpf: mockStudent.cpf }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('delete', () => {
    it('should delete a student successfully', async () => {
      mockStudentRepository.findOne.mockResolvedValue(mockStudent);
      await expect(
        studentsService.delete(mockStudent.id),
      ).resolves.toBeUndefined();
      expect(studentRepository.remove).toHaveBeenCalledWith(mockStudent);
    });

    it('should throw an error if student not found', async () => {
      mockStudentRepository.findOne.mockResolvedValue(null);
      await expect(studentsService.delete(mockStudent.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of students', async () => {
      const result = await studentsService.findAll({
        page: 1,
        limit: 10,
        search: 'abc',
      });
      expect(result).toEqual({
        total: 1,
        page: 1,
        limit: 10,
        data: [mockStudent],
      });
      expect(studentRepository.createQueryBuilder).toHaveBeenCalledWith(
        'student',
      );
    });
  });
});
