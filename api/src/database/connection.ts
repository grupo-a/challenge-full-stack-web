import { Client } from 'pg';
import { createConnection, getConnection } from 'typeorm';

class Connection {
  async create() {
    await this.createDatabase();
    await createConnection();
  }

  async close() {
    await getConnection().close();
  }

  async truncate() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  }

  async createDatabase() {
    try {
      const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: 'postgres',
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT || '5432'),
      });

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
  }
}

export default new Connection();
