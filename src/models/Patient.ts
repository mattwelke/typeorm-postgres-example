import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';

import Appointment from './Appointment';
import Doctor from './Doctor';

/**
 * The Patient model is one of the simple models in the example. It is the one side of its one-to-many relationship with
 * the Appointment model.
 */
@Entity()
export default class Patient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(
        type => Appointment,
        appointment => appointment.patient
    )
    appointments: Appointment[];
}
