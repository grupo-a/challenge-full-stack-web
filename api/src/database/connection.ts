import { Client } from 'pg';
import { createConnection } from 'typeorm';

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'postgres',
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

const createDatabase = async () => {
  try {
    await client.connect();
    const result = await client.query(
      `SELECT 1 FROM pg_database WHERE datname='${process.env.DB_DATABASE}'`
    );

    if (result.rowCount == 0) {
      await client.query(`CREATE DATABASE ${process.env.DB_DATABASE}`);
      console.log('created database');
    }

    await client.end();
  } catch (error) {
    console.error(error);
  }
};

const configureDatabase = async () => {
  await createDatabase();
  await createConnection();
};

configureDatabase();
