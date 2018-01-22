import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn    
} from 'typeorm';

import Appointment from './Appointment';
import Patient from './Patient';

/**
 * The Doctor model is one of the simple models in the example. It is the one side of its one-to-many relationship with
 * the Appointment model.
 */
@Entity()
export default class Doctor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(
        type => Appointment,
        appointment => appointment.doctor
    )
    appointments: Appointment[];
}
