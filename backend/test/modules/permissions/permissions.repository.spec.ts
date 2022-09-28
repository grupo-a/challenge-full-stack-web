import { ERRORS_DESCRIPTION } from '../../../src/common/errors/errors.enum';
import { MOCK_ID, MOCK_INJECTION } from '../../mocks/base-mock';
import { PermissionsRepository } from '../../../src/modules/permissions/permissions.repository';
import { PermissionsDao } from '../../../src/providers/database/impl/permissions.dao';
import { PERMISSIONS } from '../../mocks/permissions';

describe('PermissionsRepository', function () {
  const dao = new PermissionsDao(MOCK_INJECTION);
  const repository = new PermissionsRepository(dao);

  afterEach(() => jest.restoreAllMocks());

  it('should be sucess', async function () {
    jest.spyOn(dao, 'save').mockResolvedValue(MOCK_ID);
    const sut = await repository.create(PERMISSIONS);
    expect(sut).toBe(MOCK_ID);
  });

  it('should be error', async function () {
    jest
      .spyOn(dao, 'save')
      .mockRejectedValue(new Error(ERRORS_DESCRIPTION.INTERNAL_SERVER_ERROR));
    await expect(repository.create(PERMISSIONS)).rejects.toThrow(
      ERRORS_DESCRIPTION.INTERNAL_SERVER_ERROR,
    );
  });
});
