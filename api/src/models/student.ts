import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('students')
export default class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  ra: string;

  @Column()
  cpf: string;
}
