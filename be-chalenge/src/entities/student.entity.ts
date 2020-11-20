import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {

    @PrimaryColumn()
    ra: number;

    @Column({ type: 'bigint' })
    cpf: number;

    @Column()
    name: string;

    @Column()
    email: string;
}