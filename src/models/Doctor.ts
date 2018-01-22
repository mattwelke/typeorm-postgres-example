import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn    
} from 'typeorm';

import Appointment from './Appointment';
import Patient from './Patient';

@Entity()
export default class Doctor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Appointment, a => a.doctor)
    appointments: Appointment[];
}
