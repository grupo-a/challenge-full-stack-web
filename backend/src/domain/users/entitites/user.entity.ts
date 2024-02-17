import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';

const ENTITY_TABLE_NAME = "users"

@Entity({ name: ENTITY_TABLE_NAME })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, unique: true })
    username: string;

    @Column({ length: 255 })
    password: string;

    @Column({ length: 50 })
    user_type: string;

    @DeleteDateColumn()
    deletedat?: Date;
}
