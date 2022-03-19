import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';

import Doctor from './Doctor';
import Patient from './Patient';

/**
 * The Appointment model is a "junction model". It represents the many-to-many relationship between
 * Doctor and Patient. In this app, there is data related to this relationship (the date of the
 * appointment), so this data gets added to this model as a Column. This model is the many side of
 * the one-to-many relationships it has with the Doctor and Patient models.
 * 
 * TypeORM has @ManyToMany (https://orkhan.gitbook.io/typeorm/docs/many-to-many-relations) which
 * can be used as a quick, easy way to implement this kind of relationship, but here, we give the
 * junction table its own model so that we can attach data to it, like calling it an Appointment
 * (instead of a table called "doctor_patients_patient") and add the appointment date to each one.
 */
@Entity()
export default class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    // Data unique to the junction model. In this case, the date of the appointment.
    @Column()
    date: Date;

    // The first FK column.
    @ManyToOne(
        _ => Doctor,
        {
            nullable: false
        }
    )
    doctor: Doctor;

    // The second FK column.
    @ManyToOne(
        _ => Patient,
        {
            nullable: false
        }      
    )
    patient: Patient;
}
