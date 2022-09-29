import { ERRORS_DESCRIPTION } from '../../../src/common/errors/errors.enum';
import { MOCK_ID, MOCK_INJECTION } from '../../mocks/base-mock';
import { EmployeesRepository } from '../../../src/modules/employees/employees.repository';
import { EmployeesDao } from '../../../src/providers/database/impl/employees.dao';
import { EMPLOYEES } from '../../mocks/employees';

describe('EmployeesRepository', function () {
  const dao = new EmployeesDao(MOCK_INJECTION);
  const repository = new EmployeesRepository(dao);

  afterEach(() => jest.restoreAllMocks());

  describe('create', function () {
    it('should be sucess', async function () {
      jest.spyOn(dao, 'save').mockResolvedValue(MOCK_ID);
      const sut = await repository.create(EMPLOYEES);
      expect(sut).toBe(MOCK_ID);
    });

    it('should be an error if it already exists', async function () {
      jest
        .spyOn(dao, 'save')
        .mockRejectedValue(new Error(ERRORS_DESCRIPTION.ALREADY_EXIST));
      await expect(repository.create(EMPLOYEES)).rejects.toThrow(
        ERRORS_DESCRIPTION.ALREADY_EXIST,
      );
    });
  });

  describe('list', function () {
    it('should be sucess', async function () {
      jest.spyOn(dao, 'list').mockResolvedValue([]);
      const sut = await repository.list();
      expect(sut).toEqual([]);
    });
  });

  describe('update', function () {
    it('should be sucess', async function () {
      jest.spyOn(dao, 'update').mockResolvedValue(1);
      const sut = await repository.update(MOCK_ID, EMPLOYEES);
      expect(sut).toBe(1);
    });

    it('should be an error if it not found', async function () {
      jest
        .spyOn(dao, 'update')
        .mockRejectedValue(new Error(ERRORS_DESCRIPTION.NOT_FOUND));
      await expect(repository.update(MOCK_ID, EMPLOYEES)).rejects.toThrow(
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
