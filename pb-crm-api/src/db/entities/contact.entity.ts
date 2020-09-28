import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {EmailEntity} from "./email.entity";
import {PhoneEntity} from "./phone.entity";
import {ContactModel} from "../../api-interfaces/contact/models/contact.model";
import { MinLength, MaxLength, IsOptional, IsAlpha } from 'class-validator';


@Entity("contacts")
export class ContactEntity implements ContactModel {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @IsAlpha()
    @Column('varchar', { nullable: false})
    @MinLength(1)
    firstName: string;

    @IsAlpha()
    @Column('varchar', { nullable: false})
    @MinLength(1)
    lastName: string;

    @Column('varchar', { nullable: true})
    @IsOptional()
    @MaxLength(50)
    company?: string

    @Column('varchar', { nullable: true})
    @IsOptional()
    @MaxLength(250)
    notes?: string

    @OneToMany(type => EmailEntity, email => email.contact, {
        cascade: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    emails?: EmailEntity[];

    @OneToMany(type => PhoneEntity, phone => phone.contact, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    phones?: PhoneEntity[];

    @CreateDateColumn({name: 'createdAt', nullable: false})
    createdAt: Date;

    @UpdateDateColumn({name: 'updatedAt', nullable: true})
    updatedAt: Date;


}
