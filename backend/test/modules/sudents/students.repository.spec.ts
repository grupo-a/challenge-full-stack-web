import { StudentsRepository } from '../../../src/modules/students/students.repository';
import { MOCK_ID, MOCK_INJECTION } from '../../mocks/base-mock';
import { StudentsDao } from '../../../src/providers/database/impl/students.dao';
import { STUDENTS, STUDENTS_RETURN_DB } from '../../mocks/students';
import { ERRORS_DESCRIPTION } from '../../../src/common/errors/errors.enum';

describe('StudentsRepository', function () {
  const dao = new StudentsDao(MOCK_INJECTION);
  const repository = new StudentsRepository(dao);

  afterEach(() => jest.restoreAllMocks());

  describe('create', function () {
    it('should be sucess', async function () {
      jest.spyOn(dao, 'save').mockResolvedValue(MOCK_ID);
      const sut = await repository.create(STUDENTS);
      expect(sut).toBe(MOCK_ID);
    });

    it('should be an error if it already exists', async function () {
      jest
        .spyOn(dao, 'save')
        .mockRejectedValue(new Error(ERRORS_DESCRIPTION.ALREADY_EXIST));
      await expect(repository.create(STUDENTS)).rejects.toThrow(
        ERRORS_DESCRIPTION.ALREADY_EXIST,
      );
    });
  });

  describe('list', function () {
    it('should be sucess', async function () {
      jest.spyOn(dao, 'list').mockResolvedValue([STUDENTS_RETURN_DB]);
      const sut = await repository.list({});
      expect(sut).toEqual([STUDENTS_RETURN_DB]);
    });
  });

  describe('getById', function () {
    it('should be sucess', async function () {
      jest.spyOn(dao, 'getById').mockResolvedValue(STUDENTS_RETURN_DB);
      const sut = await repository.getById(MOCK_ID);
      expect(sut).toEqual(STUDENTS_RETURN_DB);
    });

    it('should be an error if it not found', async function () {
      jest
        .spyOn(dao, 'getById')
        .mockRejectedValue(new Error(ERRORS_DESCRIPTION.NOT_FOUND));
      await expect(repository.getById(MOCK_ID)).rejects.toThrow(
        ERRORS_DESCRIPTION.NOT_FOUND,
      );
    });
  });

  describe('update', function () {
    it('should be sucess', async function () {
      jest.spyOn(dao, 'update').mockResolvedValue(1);
      const sut = await repository.update(MOCK_ID, STUDENTS);
      expect(sut).toBe(1);
    });

    it('should be an error if it not found', async function () {
      jest
        .spyOn(dao, 'update')
        .mockRejectedValue(new Error(ERRORS_DESCRIPTION.NOT_FOUND));
      await expect(repository.update(MOCK_ID, STUDENTS)).rejects.toThrow(
        ERRORS_DESCRIPTION.NOT_FOUND,
      );
    });
  });

  describe('delete', function () {
    it('should be sucess', async function () {
      jest.spyOn(dao, 'delete').mockResolvedValue(1);
      const sut = await repository.delete(MOCK_ID);
      expect(sut).toBe(1);
    });

    it('should be an error if it not found', async function () {
      jest
        .spyOn(dao, 'delete')
        .mockRejectedValue(new Error(ERRORS_DESCRIPTION.NOT_FOUND));
      await expect(repository.delete(MOCK_ID)).rejects.toThrow(
        ERRORS_DESCRIPTION.NOT_FOUND,
      );
    });
  });
});
