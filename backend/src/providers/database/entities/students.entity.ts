import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StudantsInterface } from '../../../models/interfaces/studants.interface';
import { randomUUID } from 'crypto';

@Entity({ name: 'students', orderBy: { name: 'ASC' } })
export class StudentsEntity implements StudantsInterface {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column('varchar', { length: 11, unique: true }) cpf: string;
  @Column('varchar') email: string;
  @Column('varchar') name: string;
  @Column('uuid', { unique: true }) ra: string;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;

  constructor() {
    this.ra = randomUUID();
  }
}
