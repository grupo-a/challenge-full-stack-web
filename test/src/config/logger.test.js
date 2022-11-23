import winston from 'winston'
import logger from '../../../src/config/logger.js'

describe('logger', () => {
  const loggerInstance = logger(winston)
  it('should return a logger', () => {
    expect(loggerInstance).toHaveProperty('info')
    expect(loggerInstance).toHaveProperty('error')
  })
})
