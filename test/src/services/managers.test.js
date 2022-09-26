import managers from '../../../src/services/managers'
import { dbConnectionManagersDepOk, dbConnectionManagersDepFail } from '../../mocks/index.mock.js'
import { CustomError } from '../../../src/utils/errorHandler'

describe('manager', () => {
  it('should successfully execute getManagerByEmail', async () => {
    const managerService = managers(dbConnectionManagersDepOk, CustomError)
    const managerResult = await managerService.getManagerByEmail('email@email.com')
    expect(managerResult).toBeDefined()
  })

  it('should fail to execute getManagerByEmail', async () => {
    const managerService = managers(dbConnectionManagersDepFail, CustomError)
    await expect(async () => await managerService.getManagerByEmail('')).rejects.toThrow(
      CustomError
    )
  })
})
