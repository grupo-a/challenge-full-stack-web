import { ERRORS_DESCRIPTION } from '../../../src/common/errors/errors.enum';
import { MOCK_ID, MOCK_INJECTION } from '../../mocks/base-mock';
import { PermissionsService } from '../../../src/modules/permissions/permissions.service';
import { PermissionsRepository } from '../../../src/modules/permissions/permissions.repository';
import { PERMISSIONS_DB, PERMISSIONS_LIST } from '../../mocks/permissions';

describe('PermissionsService', function () {
  const repository = new PermissionsRepository(MOCK_INJECTION);
  const service = new PermissionsService(repository);

  afterEach(() => jest.restoreAllMocks());

  describe('create', function () {
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

  describe('getByEmployeeId', function () {
    it('should be sucess', async function () {
      jest
        .spyOn(repository, 'getByEmployeeId')
        .mockResolvedValue(PERMISSIONS_DB);
      const sut = await service.getByEmployeeId(MOCK_ID);
      expect(sut).toEqual(PERMISSIONS_DB);
    });

    it('should be an error if it not found', async function () {
      jest
        .spyOn(repository, 'getByEmployeeId')
        .mockRejectedValue(new Error(ERRORS_DESCRIPTION.NOT_FOUND));
      await expect(service.getByEmployeeId(MOCK_ID)).rejects.toThrow(
        ERRORS_DESCRIPTION.NOT_FOUND,
      );
    });
  });

  describe('update', function () {
    it('should be sucess', async function () {
      jest.spyOn(repository, 'update').mockResolvedValue(1);
      const sut = await service.update(MOCK_ID, PERMISSIONS_LIST);
      expect(sut).toBe(1);
    });

    it('should be an error if it not found', async function () {
      jest
        .spyOn(repository, 'update')
        .mockRejectedValue(new Error(ERRORS_DESCRIPTION.NOT_FOUND));
      await expect(service.update(MOCK_ID, PERMISSIONS_LIST)).rejects.toThrow(
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
