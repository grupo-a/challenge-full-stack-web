import { DataSource } from 'typeorm'
import ormconfig from './ormconfig.js'
import logger from '../../logger.js'

const postgresConnection = new DataSource(ormconfig)

try {
  await postgresConnection.initialize()
  logger.info('Connected to postgres database')
} catch (error) {
  logger.error('Error connecting to postgres database', error)
}

export default postgresConnection
