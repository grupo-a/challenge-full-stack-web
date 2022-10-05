import { ERRORS_DESCRIPTION } from '../../../src/common/errors/errors.enum';
import { MOCK_ID, MOCK_INJECTION } from '../../mocks/base-mock';
import { EmployeesDao } from '../../../src/providers/database/impl/employees.dao';
import { EMPLOYEES_RETURN_DB } from '../../mocks/employees';
import { AuthRepository } from '../../../src/modules/auth/auth.repository';

describe('AuthRepository', function () {
  const dao = new EmployeesDao(MOCK_INJECTION);
  const repository = new AuthRepository(dao);

  afterEach(() => jest.restoreAllMocks());

  describe('create', function () {
    it('should be sucess', async function () {
      jest.spyOn(dao, 'getByEnrolment').mockResolvedValue(EMPLOYEES_RETURN_DB);
      const sut = await repository.getByEnrolment(MOCK_ID);
      expect(sut).toEqual(EMPLOYEES_RETURN_DB);
    });

    it('should be an error if it already exists', async function () {
      jest
        .spyOn(dao, 'getByEnrolment')
        .mockRejectedValue(new Error(ERRORS_DESCRIPTION.NOT_FOUND));
      await expect(repository.getByEnrolment(MOCK_ID)).rejects.toThrow(
        ERRORS_DESCRIPTION.NOT_FOUND,
      );
    });
  });
});
