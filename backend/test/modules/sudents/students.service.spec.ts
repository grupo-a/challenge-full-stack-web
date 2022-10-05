import { StudentsService } from '../../../src/modules/students/students.service';
import { StudentsRepository } from '../../../src/modules/students/students.repository';
import { ERRORS_DESCRIPTION } from '../../../src/common/errors/errors.enum';
import { STUDENTS, STUDENTS_RETURN_DB } from '../../mocks/students';
import { MOCK_ID, MOCK_INJECTION } from '../../mocks/base-mock';

describe('StudentsService', function () {
  const repository = new StudentsRepository(MOCK_INJECTION);
  const service = new StudentsService(repository);

  afterEach(() => jest.restoreAllMocks());

  describe('create', function () {
    it('should be sucess', async function () {
      jest.spyOn(repository, 'create').mockResolvedValue(MOCK_ID);
      const sut = await service.create(STUDENTS);
      expect(sut).toBe(MOCK_ID);
    });

    it('should be an error if it already exists', async function () {
      jest
        .spyOn(repository, 'create')
        .mockRejectedValue(new Error(ERRORS_DESCRIPTION.ALREADY_EXIST));
      await expect(service.create(STUDENTS)).rejects.toThrow(
        ERRORS_DESCRIPTION.ALREADY_EXIST,
      );
    });
  });

  describe('list', function () {
    it('should be sucess', async function () {
      jest.spyOn(repository, 'list').mockResolvedValue([STUDENTS_RETURN_DB]);
      const sut = await service.list({});
      expect(sut).toEqual([STUDENTS_RETURN_DB]);
    });
  });

  describe('getById', function () {
    it('should be sucess', async function () {
      jest.spyOn(repository, 'getById').mockResolvedValue(STUDENTS_RETURN_DB);
      const sut = await service.getById(MOCK_ID);
      expect(sut).toEqual(STUDENTS_RETURN_DB);
    });

    it('should be an error if it not found', async function () {
      jest
        .spyOn(repository, 'getById')
        .mockRejectedValue(new Error(ERRORS_DESCRIPTION.NOT_FOUND));
      await expect(service.getById(MOCK_ID)).rejects.toThrow(
        ERRORS_DESCRIPTION.NOT_FOUND,
      );
    });
  });

  describe('update', function () {
    it('should be sucess', async function () {
      jest.spyOn(repository, 'update').mockResolvedValue(1);
      const sut = await service.update(MOCK_ID, STUDENTS);
      expect(sut).toBe(1);
    });

    it('should be an error if it not found', async function () {
      jest
        .spyOn(repository, 'update')
        .mockRejectedValue(new Error(ERRORS_DESCRIPTION.NOT_FOUND));
      await expect(service.update(MOCK_ID, STUDENTS)).rejects.toThrow(
        ERRORS_DESCRIPTION.NOT_FOUND,
      );
    });
  });

  describe('delete', function () {
    it('should be sucess', async function () {
      jest.spyOn(repository, 'delete').mockResolvedValue(1);
      const sut = await service.delete(MOCK_ID);
      expect(sut).toBe(1);
    });

    it('should be an error if it not found', async function () {
      jest
        .spyOn(repository, 'delete')
        .mockRejectedValue(new Error(ERRORS_DESCRIPTION.NOT_FOUND));
      await expect(service.delete(MOCK_ID)).rejects.toThrow(
        ERRORS_DESCRIPTION.NOT_FOUND,
      );
    });
  });
});
