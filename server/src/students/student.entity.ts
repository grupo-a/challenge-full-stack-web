import {
  Entity,
  Index,
  PrimaryColumn,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";
import { StudentInterface } from "@shared/interfaces";

@Entity()
export class Student implements StudentInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  @Index({ unique: true })
  ra: string;

  @PrimaryColumn()
  @Index({ unique: true })
  cpf: string;

  @PrimaryColumn()
  @Index({ unique: true })
  email: string;

  @Column({ nullable: false })
  name: string;
}
