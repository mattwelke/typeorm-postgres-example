import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';

import Appointment from './Appointment';
import Doctor from './Doctor';

/**
 * The Patient model.
 */
@Entity()
export default class Patient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Appointment, a => a.patient)
    appointments: Appointment[];
}
