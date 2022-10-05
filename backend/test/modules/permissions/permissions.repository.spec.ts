import { ERRORS_DESCRIPTION } from '../../../src/common/errors/errors.enum';
import { MOCK_ID, MOCK_INJECTION } from '../../mocks/base-mock';
import { PermissionsRepository } from '../../../src/modules/permissions/permissions.repository';
import { PermissionsDao } from '../../../src/providers/database/impl/permissions.dao';
import { PERMISSIONS, PERMISSIONS_DB } from '../../mocks/permissions';

describe('PermissionsRepository', function () {
  const dao = new PermissionsDao(MOCK_INJECTION);
  const repository = new PermissionsRepository(dao);

  afterEach(() => jest.restoreAllMocks());

  describe('create', function () {
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

  describe('getByEmployeeId', function () {
    it('should be sucess', async function () {
      jest.spyOn(dao, 'getById').mockResolvedValue(PERMISSIONS_DB);
      const sut = await repository.getByEmployeeId(MOCK_ID);
      expect(sut).toEqual(PERMISSIONS_DB);
    });

    it('should be an error if it not found', async function () {
      jest
        .spyOn(dao, 'getById')
        .mockRejectedValue(new Error(ERRORS_DESCRIPTION.NOT_FOUND));
      await expect(repository.getByEmployeeId(MOCK_ID)).rejects.toThrow(
        ERRORS_DESCRIPTION.NOT_FOUND,
      );
    });
  });

  describe('update', function () {
    it('should be sucess', async function () {
      jest.spyOn(dao, 'update').mockResolvedValue(1);
      const sut = await repository.update(MOCK_ID, PERMISSIONS);
      expect(sut).toBe(1);
    });

    it('should be an error if it not found', async function () {
      jest
        .spyOn(dao, 'update')
        .mockRejectedValue(new Error(ERRORS_DESCRIPTION.NOT_FOUND));
      await expect(repository.update(MOCK_ID, PERMISSIONS)).rejects.toThrow(
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
