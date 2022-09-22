import { Table } from 'typeorm'

export class Students1663834643151 {
  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'students',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'ra',
            type: 'varchar',
            isNullable: false,
            isUnique: true
          },
          {
            name: 'cpf',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    )
  }

  async down(queryRunner) {
    await queryRunner.dropTable('students')
  }
}
