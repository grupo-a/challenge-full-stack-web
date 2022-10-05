import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PermissionsInterface } from '../../../models/interfaces/permissions.interface';
import { EmployeesEntity } from './employees.entity';

@Entity({ name: 'permissions' })
export class PermissionsEntity implements PermissionsInterface {
  @PrimaryGeneratedColumn('uuid') id: string;
  @OneToOne(() => EmployeesEntity)
  @JoinColumn({ name: 'employeeId' })
  employeeId: EmployeesEntity | string;
  @Column('boolean', { default: true }) read: boolean;
  @Column('boolean', { default: false }) create: boolean;
  @Column('boolean', { default: false }) update: boolean;
  @Column('boolean', { default: false }) delete: boolean;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}
