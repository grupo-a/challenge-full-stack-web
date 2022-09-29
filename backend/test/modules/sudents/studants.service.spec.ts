import { StudantsService } from '../../../src/modules/students/studants.service';
import { StudantsRepository } from '../../../src/modules/students/studants.repository';
import { ERRORS_DESCRIPTION } from '../../../src/common/errors/errors.enum';
import { STUDENTS, STUDENTS_RETURN_DB } from '../../mocks/students';
import { MOCK_ID, MOCK_INJECTION } from '../../mocks/base-mock';

describe('StudantsService', function () {
  const repository = new StudantsRepository(MOCK_INJECTION);
  const service = new StudantsService(repository);

  afterEach(() => jest.restoreAllMocks());

  describe('create', function () {
    it('should be sucess', async function () {
      jest.spyOn(repository, 'create').mockResolvedValue(MOCK_ID);
      const sut = await service.create(STUDENTS);
      expect(sut).toBe(MOCK_ID);
    });

    it('should be an error if it already exists', async function () {
      jest
        .spyOn(repository, 'create')
        .mockRejectedValue(new Error(ERRORS_DESCRIPTION.ALREADY_EXIST));
      await expect(service.create(STUDENTS)).rejects.toThrow(
        ERRORS_DESCRIPTION.ALREADY_EXIST,
      );
    });
  });

  describe('list', function () {
    it('should be sucess', async function () {
      jest.spyOn(repository, 'list').mockResolvedValue([STUDENTS_RETURN_DB]);
      const sut = await service.list({});
      expect(sut).toEqual([STUDENTS_RETURN_DB]);
    });
  });

  describe('update', function () {
    it('should be sucess', async function () {
      jest.spyOn(repository, 'update').mockResolvedValue(1);
      const sut = await service.update(MOCK_ID, STUDENTS);
      expect(sut).toBe(1);
    });

    it('should be an error if it not found', async function () {
      jest
        .spyOn(repository, 'update')
        .mockRejectedValue(new Error(ERRORS_DESCRIPTION.ALREADY_EXIST));
      await expect(service.update(MOCK_ID, STUDENTS)).rejects.toThrow(
        ERRORS_DESCRIPTION.ALREADY_EXIST,
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
        .mockRejectedValue(new Error(ERRORS_DESCRIPTION.ALREADY_EXIST));
      await expect(service.delete(MOCK_ID)).rejects.toThrow(
        ERRORS_DESCRIPTION.ALREADY_EXIST,
      );
    });
  });
});
