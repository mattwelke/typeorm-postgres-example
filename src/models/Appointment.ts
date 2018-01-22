import {
    Column,
    Entity,
    ManyToOne
} from 'typeorm';

import Doctor from './Doctor';
import Patient from './Patient';

/**
 * The Appointment model is a "junction model". It represents the many-to-many relationship between Doctor and Patient.
 * In this app, there is data related to this relationship (the date of the appointment), so this data gets added to
 * this model as a Column.
 * 
 * This model is the many side of the one-to-many relationships it has with the Doctor and Patient models.
 */
@Entity()
export default class Appointment {
    @Column()
    date: Date;

    @ManyToOne(
        type => Doctor,
        doctor => doctor.appointments,
        {
            primary: true, // Use this as part of composite primary key (no need for auto inc primary key).
            nullable: false // Can't use as part of composite primary key without this.
        }
    )
    doctor: Doctor;

    @ManyToOne(
        type => Patient,
        patient => patient.appointments,
        {
            // Second part of composite primary key.
            primary: true,
            nullable: false
        }      
    )
    patient: Patient;
}
