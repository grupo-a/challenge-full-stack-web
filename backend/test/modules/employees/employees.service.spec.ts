import { ERRORS_DESCRIPTION } from '../../../src/common/errors/errors.enum';
import { MOCK_ID, MOCK_INJECTION } from '../../mocks/base-mock';
import { EmployeesService } from '../../../src/modules/employees/employees.service';
import { EmployeesRepository } from '../../../src/modules/employees/employees.repository';
import { EMPLOYEES } from '../../mocks/employees';

describe('EmployeesService', function () {
  const repository = new EmployeesRepository(MOCK_INJECTION, MOCK_INJECTION);
  const service = new EmployeesService(repository);

  afterEach(() => jest.restoreAllMocks());

  it('should be sucess', async function () {
    jest.spyOn(repository, 'create').mockResolvedValue(MOCK_ID);
    const sut = await service.create(EMPLOYEES);
    expect(sut).toBe(MOCK_ID);
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
