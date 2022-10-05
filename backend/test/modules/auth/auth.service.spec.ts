import { ERRORS_DESCRIPTION } from '../../../src/common/errors/errors.enum';
import { MOCK_INJECTION, MOCK_TOKEN } from '../../mocks/base-mock';
import { EMPLOYEES, EMPLOYEES_RETURN_DB } from '../../mocks/employees';
import { AuthService } from '../../../src/modules/auth/auth.service';
import { AuthRepository } from '../../../src/modules/auth/auth.repository';

describe('AuthService', function () {
  const repository = new AuthRepository(MOCK_INJECTION);
  const service = new AuthService(repository);

  afterEach(() => jest.restoreAllMocks());

  describe('getByEnrolment', function () {
    it('should be sucess', async function () {
      jest
        .spyOn(repository, 'getByEnrolment')
        .mockResolvedValue(EMPLOYEES_RETURN_DB);
      jest.spyOn(service, 'generateToken').mockResolvedValue(MOCK_TOKEN);
      const sut = await service.signIn({
        enrolment: EMPLOYEES.enrolment,
        password: EMPLOYEES.password,
      });
      expect(sut).toBe(MOCK_TOKEN);
    });

    it('should be an error if it unauthorized', async function () {
      jest
        .spyOn(repository, 'getByEnrolment')
        .mockRejectedValue(new Error(ERRORS_DESCRIPTION.UNAUTHORIZED));
      await expect(
        service.signIn({
          enrolment: EMPLOYEES.enrolment,
          password: EMPLOYEES.password,
        }),
      ).rejects.toThrow(ERRORS_DESCRIPTION.UNAUTHORIZED);
    });
  });
});
