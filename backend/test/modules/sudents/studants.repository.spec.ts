import { ERRORS_DESCRIPTION } from '../../../src/common/errors/errors.enum';
import { StudantsRepository } from '../../../src/modules/students/studants.repository';
import { MOCK_ID, MOCK_INJECTION } from '../../mocks/base-mock';
import { StudentsDao } from '../../../src/providers/database/impl/students.dao';
import { STUDENTS } from '../../mocks/students';

describe('StudantsRepository', function () {
  const dao = new StudentsDao(MOCK_INJECTION);
  const service = new StudantsRepository(dao);

  afterEach(() => jest.restoreAllMocks());

  it('should be sucess', async function () {
    jest.spyOn(dao, 'save').mockResolvedValue(MOCK_ID);
    const sut = await service.create(STUDENTS);
    expect(sut).toBe(MOCK_ID);
  });

  it('should be an error if it already exists', async function () {
    jest
      .spyOn(dao, 'save')
      .mockRejectedValue(new Error(ERRORS_DESCRIPTION.ALREADY_EXIST));
    await expect(service.create(STUDENTS)).rejects.toThrow(
      ERRORS_DESCRIPTION.ALREADY_EXIST,
    );
  });
});
