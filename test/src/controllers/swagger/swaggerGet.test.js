import swaggerGet from '../../../../src/controllers/swagger/swaggerGet'
import { swaggerGetDepOk } from '../../../mocks/index.mock'
import swaggerJSDoc from 'swagger-jsdoc'

describe('swaggerGet', () => {
  it('should return swagger json', () => {
    const docs = swaggerJSDoc({
      apis: ['src/docs/*.yaml'],
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Educacao API',
          version: '1.0.0'
        }
      }
    })
    const swaggerGetController = swaggerGet(swaggerGetDepOk)
    swaggerGetController({}, {})
    expect(swaggerGetDepOk.responseOk).toHaveBeenCalledTimes(1)
    expect(swaggerGetDepOk.responseOk).toHaveBeenCalledWith({}, docs)
  })
})
