import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateStudents1599277039140 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'students',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'ra',
                        type: 'int',
                        isUnique: true,
                    },
                    {
                        name: 'cpf',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('students');
    }
}
