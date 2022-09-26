export default async (typeOrmDep) => {
  const { DataSource, logger } = typeOrmDep
  const postgresConnection = new DataSource(typeOrmDep.ormconfig)
  try {
    await postgresConnection.initialize()
    logger.info('Connected to postgres database')
  } catch (error) {
    logger.error('Error connecting to postgres database', error)
  }
  return postgresConnection
}
