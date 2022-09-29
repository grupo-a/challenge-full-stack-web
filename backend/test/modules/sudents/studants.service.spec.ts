import { StudantsService } from '../../../src/modules/students/studants.service';
import { StudantsRepository } from '../../../src/modules/students/studants.repository';
import { ERRORS_DESCRIPTION } from '../../../src/common/errors/errors.enum';
import { STUDENTS } from '../../mocks/students';
import { MOCK_ID, MOCK_INJECTION } from '../../mocks/base-mock';

describe('StudantsService', function () {
  const repository = new StudantsRepository(MOCK_INJECTION);
  const service = new StudantsService(repository);

  afterEach(() => jest.restoreAllMocks());

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
