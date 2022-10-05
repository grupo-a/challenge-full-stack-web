import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EmployeesInterface } from '../../../models/interfaces/employees.interface';
import { ulid } from '../../../common/utils/ulid';

@Entity({ name: 'employees', orderBy: { name: 'ASC' } })
export class EmployeesEntity
  implements Omit<EmployeesInterface, 'permissions'>
{
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column('varchar', { length: 11, unique: true }) cpf: string;
  @Column('varchar') email: string;
  @Column('varchar') name: string;
  @Column('varchar', { unique: true }) enrolment: string;
  @Column('varchar') password: string;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;

  constructor() {
    if (!this.enrolment) this.enrolment = ulid();
  }
}
