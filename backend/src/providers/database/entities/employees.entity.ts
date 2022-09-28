import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EmployeesInterface } from '../../../models/interfaces/employees.interface';
import { randomUUID } from 'crypto';

@Entity({ name: 'employees', orderBy: { name: 'ASC' } })
export class EmployeesEntity
  implements Omit<EmployeesInterface, 'permissions'>
{
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column('varchar', { length: 11, unique: true }) cpf: string;
  @Column('varchar') email: string;
  @Column('varchar') name: string;
  @Column('uuid', { unique: true }) enrolment: string;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;

  constructor() {
    this.enrolment = randomUUID();
  }
}
