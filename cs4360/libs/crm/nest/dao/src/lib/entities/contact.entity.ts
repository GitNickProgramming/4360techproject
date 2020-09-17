import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany, ManyToOne,
} from 'typeorm'


import {EmailEntity} from "./email.entity";
import {PhoneEntity} from "./phone.entity";
import {UserEntity} from "./user.entity";

@Entity("contact")
export class ContactEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', { length: 50, nullable: false })
  firstName: string;

  @Column('varchar', { length: 50, nullable: false })
  lastName: string;

  @Column('varchar', { length: 50, nullable: true})
  company: string

  @Column('varchar', {length: 250, nullable: true})
  notes: string

  @OneToMany(type => EmailEntity, email => email.contact, {
    cascade: true
  })
  emails?: EmailEntity[];

  @OneToMany(type => PhoneEntity, phone => phone.contact, {
    cascade: true
  })
  phones?: PhoneEntity[];




}
