require("dotenv/config");

const devConfig = [
  {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_NAME,
    entities: [
      './src/modules/**/infra/typeorm/entities/*.ts'
    ],
    migrations: [
      './src/shared/infra/typeorm/migrations/*.ts'
    ],
    cli: {
      migrationsDir: './src/shared/infra/typeorm/migrations',
    },
  },
];

module.exports = devConfig;
