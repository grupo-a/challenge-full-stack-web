import postgres from '../../../../../src/config/database/postgres/postgres.js'
import { typeOrmDepOk, typeOrmDepFail } from '../../../../mocks/index.mock.js'

describe('postgres', () => {
  it('should call initialize and log', async () => {
    await postgres(typeOrmDepOk)
    expect(typeOrmDepOk.logger.info).toHaveBeenCalled()
    expect(typeOrmDepOk.logger.error).not.toHaveBeenCalled()
  })
  it('should call log error', async () => {
    await postgres(typeOrmDepFail)
    expect(typeOrmDepFail.logger.info).not.toHaveBeenCalled()
    expect(typeOrmDepFail.logger.error).toHaveBeenCalled()
  })
})
