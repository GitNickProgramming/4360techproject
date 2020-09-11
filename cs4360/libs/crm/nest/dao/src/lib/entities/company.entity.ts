import {
  Column,
  Entity,
  JoinTable,
  ManyToMany, OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import {ContactEntity} from "./contact.entity";
import {EmployeeEntity} from "./employee.entity";

@Entity('companies')
export class CompanyEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', { length: 500, unique: true, nullable: false })
  name: string;

  @Column('numeric', { unique: true })
  phone?: number;

  @Column('varchar', { length: 500, unique: true })
  email?: string;

  @OneToMany(type => EmployeeEntity, employee => employee.company)
  employees: EmployeeEntity[];

}
