import { getConnection } from 'typeorm';

export default async () => {
  const connection = getConnection();
  const entities = connection.entityMetadatas;

  for (const entity of entities) {
    const repository = connection.getRepository(entity.name);
    await repository.query(`DELETE FROM ${entity.tableName}`);
  }
};
