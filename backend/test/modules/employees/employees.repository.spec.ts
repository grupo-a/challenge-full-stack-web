import { ERRORS_DESCRIPTION } from '../../../src/common/errors/errors.enum';
import { MOCK_ID, MOCK_INJECTION } from '../../mocks/base-mock';
import { EmployeesRepository } from '../../../src/modules/employees/employees.repository';
import { EmployeesDao } from '../../../src/providers/database/impl/employees.dao';
import { PermissionsService } from '../../../src/modules/permissions/permissions.service';
import { EMPLOYEES } from '../../mocks/employees';
import { Logger } from '@nestjs/common';

describe('EmployeesRepository', function () {
  const dao = new EmployeesDao(MOCK_INJECTION);
  const permissions = new PermissionsService(MOCK_INJECTION);
  const repository = new EmployeesRepository(dao, permissions);

  afterEach(() => jest.restoreAllMocks());

  it('should be sucess', async function () {
    jest.spyOn(dao, 'save').mockResolvedValue(MOCK_ID);
    jest.spyOn(permissions, 'create').mockResolvedValue(MOCK_ID);
    const sut = await repository.create(EMPLOYEES);
    expect(sut).toBe(MOCK_ID);
  });

  it('should succeed and generate error log on saving permissions', async function () {
    jest.spyOn(dao, 'save').mockResolvedValue(MOCK_ID);
    jest
      .spyOn(permissions, 'create')
      .mockRejectedValue(new Error(ERRORS_DESCRIPTION.INTERNAL_SERVER_ERROR));
    jest.spyOn(Logger.prototype, 'warn');
    const sut = await repository.create(EMPLOYEES);
    expect(sut).toBe(MOCK_ID);
    expect(Logger.prototype.warn).toBeCalled();
  });

  it('should be an error if it already exists', async function () {
    jest
      .spyOn(dao, 'save')
      .mockRejectedValue(new Error(ERRORS_DESCRIPTION.INTERNAL_SERVER_ERROR));
    await expect(repository.create(EMPLOYEES)).rejects.toThrow(
      ERRORS_DESCRIPTION.INTERNAL_SERVER_ERROR,
    );
  });
});
