export default async (typeOrmDep) => {
  const postgresConnection = new typeOrmDep.DataSource(typeOrmDep.ormconfig)
  try {
    await postgresConnection.initialize()
    typeOrmDep.logger.info('Connected to postgres database')
  } catch (error) {
    typeOrmDep.logger.error('Error connecting to postgres database', error)
  }
  return postgresConnection
}
