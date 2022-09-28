import { ERRORS_DESCRIPTION } from '../../../src/common/errors/errors.enum';
import { MOCK_ID, MOCK_INJECTION } from '../../mocks/base-mock';
import { PermissionsService } from '../../../src/modules/permissions/permissions.service';
import { PermissionsRepository } from '../../../src/modules/permissions/permissions.repository';
import { PERMISSIONS_LIST } from '../../mocks/permissions';

describe('PermissionsService', function () {
  const repository = new PermissionsRepository(MOCK_INJECTION);
  const service = new PermissionsService(repository);

  afterEach(() => jest.restoreAllMocks());

  it('should be sucess', async function () {
    jest.spyOn(repository, 'create').mockResolvedValue(MOCK_ID);
    const sut = await service.create(MOCK_ID, PERMISSIONS_LIST);
    expect(sut).toBe(MOCK_ID);
  });

  it('should be error', async function () {
    jest
      .spyOn(repository, 'create')
      .mockRejectedValue(new Error(ERRORS_DESCRIPTION.INTERNAL_SERVER_ERROR));
    await expect(service.create(MOCK_ID, PERMISSIONS_LIST)).rejects.toThrow(
      ERRORS_DESCRIPTION.INTERNAL_SERVER_ERROR,
    );
  });
});
