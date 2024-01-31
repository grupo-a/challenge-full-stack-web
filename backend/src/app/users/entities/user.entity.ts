import {
    Column,
    Table,
    Model,
    Unique,
    BeforeCreate,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    PrimaryKey,
    DataType,
    IsEmail,
    IsUUID
} from "sequelize-typescript";
import { hashSync } from 'bcrypt';

@Table({
    tableName: 'users',
    paranoid: true,
})
export class User extends Model<User>{

    @IsUUID(4)
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4, 
        allowNull: false,
        primaryKey: true,
    })
    id!: string;

    @Column({ allowNull: false, })
    name: string;

    @IsEmail
    @Column({ allowNull: false })
    email: string;

    @Column({ allowNull: false })
    password: string;

    @Unique
    @Column({
        type: DataType.STRING(30),
        allowNull: false
    })
    ra: string;

    @Column({
        allowNull: false,
        type: DataType.STRING(11)
    })
    cpf: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @DeletedAt
    deletedAt: Date;

    @BeforeCreate
    static async hashPassword(instance: User) {
        if (instance.changed('password')) {
            instance.password = hashSync(instance.password, 10);
        }
    }

    @BeforeCreate
    static async valideCPF(instance: User) {
        instance.cpf = instance.cpf.replace(/[^\d]/g, '')
        console.log('cpf insta: ', instance.cpf)
    }
}
