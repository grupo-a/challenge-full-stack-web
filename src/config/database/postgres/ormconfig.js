import { strToBool } from '../../../utils/convertions.js'
export default {
  type: process.env.TYPEORM_CONNECTION || 'postgres',
  host: process.env.TYPEORM_HOST || 'localhost',
  port: process.env.TYPEORM_PORT || 5432,
  username: process.env.TYPEORM_USERNAME || 'postgres',
  password: process.env.TYPEORM_PASSWORD || 'postgres',
  database: process.env.TYPEORM_DATABASE || 'educacao',
  synchronize: strToBool(process.env.TYPEORM_SYNCHRONIZE) || false,
  logging: strToBool(process.env.TYPEORM_LOGGING) || true,
  entities: process.env.TYPEORM_ENTITIES
    ? [process.env.TYPEORM_ENTITIES]
    : ['../../../database/postgres/models/*.js'],
  migrations: process.env.TYPEORM_MIGRATIONS
    ? [process.env.TYPEORM_MIGRATIONS]
    : ['../../../database/postgres/migrations/*.js'],
  migrationsRun: true
}
