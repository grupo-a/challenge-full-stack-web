import { ERRORS_DESCRIPTION } from '../../../src/common/errors/errors.enum';
import { MOCK_ID, MOCK_INJECTION } from '../../mocks/base-mock';
import { EmployeesService } from '../../../src/modules/employees/employees.service';
import { EmployeesRepository } from '../../../src/modules/employees/employees.repository';
import { EMPLOYEES, EMPLOYEES_RETURN_DB } from '../../mocks/employees';
import { PermissionsService } from '../../../src/modules/permissions/permissions.service';
import { Logger } from '@nestjs/common';

describe('EmployeesService', function () {
  const repository = new EmployeesRepository(MOCK_INJECTION);
  const permissions = new PermissionsService(MOCK_INJECTION);
  const service = new EmployeesService(repository, permissions);

  afterEach(() => jest.restoreAllMocks());

  describe('create', function () {
    it('should be sucess', async function () {
      jest.spyOn(repository, 'create').mockResolvedValue(MOCK_ID);
      jest.spyOn(permissions, 'create').mockResolvedValue(MOCK_ID);
      const sut = await service.create(EMPLOYEES);
      jest.spyOn(Logger.prototype, 'warn');
      expect(sut).toBe(MOCK_ID);
      expect(Logger.prototype.warn).not.toBeCalled();
    });

    it('should succeed and generate error log on saving permissions', async function () {
      jest.spyOn(repository, 'create').mockResolvedValue(MOCK_ID);
      jest
        .spyOn(permissions, 'create')
        .mockRejectedValue(new Error(ERRORS_DESCRIPTION.INTERNAL_SERVER_ERROR));
      jest.spyOn(Logger.prototype, 'warn');
      const sut = await service.create(EMPLOYEES);
      expect(sut).toBe(MOCK_ID);
      expect(Logger.prototype.warn).toBeCalled();
    });

    it('should be an error if it already exists', async function () {
      jest
        .spyOn(repository, 'create')
        .mockRejectedValue(new Error(ERRORS_DESCRIPTION.ALREADY_EXIST));
      await expect(service.create(EMPLOYEES)).rejects.toThrow(
        ERRORS_DESCRIPTION.ALREADY_EXIST,
      );
    });
  });

  describe('list', function () {
    it('should be sucess', async function () {
      jest.spyOn(repository, 'list').mockResolvedValue([EMPLOYEES_RETURN_DB]);
      const sut = await service.list();
      expect(sut).toEqual([EMPLOYEES_RETURN_DB]);
    });
  });

  describe('getById', function () {
    it('should be sucess', async function () {
      jest.spyOn(repository, 'getById').mockResolvedValue(EMPLOYEES_RETURN_DB);
      const sut = await service.getById(MOCK_ID);
      expect(sut).toBe(EMPLOYEES_RETURN_DB);
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
      jest.spyOn(permissions, 'update').mockResolvedValue(1);
      jest.spyOn(Logger.prototype, 'warn');
      const sut = await service.update(MOCK_ID, EMPLOYEES);
      expect(sut).toBe(1);
      expect(Logger.prototype.warn).not.toBeCalled();
    });

    it('should succeed and generate error log on saving permissions', async function () {
      jest.spyOn(repository, 'update').mockResolvedValue(1);
      jest
        .spyOn(permissions, 'update')
        .mockRejectedValue(new Error(ERRORS_DESCRIPTION.INTERNAL_SERVER_ERROR));
      jest.spyOn(Logger.prototype, 'warn');
      const sut = await service.update(MOCK_ID, EMPLOYEES);
      expect(sut).toBe(1);
      expect(Logger.prototype.warn).toBeCalled();
    });

    it('should be an error if it not found', async function () {
      jest
        .spyOn(repository, 'update')
        .mockRejectedValue(new Error(ERRORS_DESCRIPTION.NOT_FOUND));
      await expect(service.update(MOCK_ID, EMPLOYEES)).rejects.toThrow(
        ERRORS_DESCRIPTION.NOT_FOUND,
      );
    });
  });

  describe('delete', function () {
    it('should be sucess', async function () {
      jest.spyOn(repository, 'delete').mockResolvedValue(1);
      jest.spyOn(permissions, 'delete').mockResolvedValue(1);
      const sut = await service.delete(MOCK_ID);
      expect(sut).toBe(1);
    });

    it('should be an error if it not found permissions', async function () {
      jest
        .spyOn(permissions, 'delete')
        .mockRejectedValue(new Error(ERRORS_DESCRIPTION.NOT_FOUND));

      await expect(service.delete(MOCK_ID)).rejects.toThrow(
        ERRORS_DESCRIPTION.NOT_FOUND,
      );
    });

    it('should be an error if it not found employee', async function () {
      jest.spyOn(permissions, 'delete').mockResolvedValue(1);
      jest
        .spyOn(repository, 'delete')
        .mockRejectedValue(new Error(ERRORS_DESCRIPTION.NOT_FOUND));
      await expect(service.delete(MOCK_ID)).rejects.toThrow(
        ERRORS_DESCRIPTION.NOT_FOUND,
      );
    });
  });
});
