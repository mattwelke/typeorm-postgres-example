import {
    Column,
    Entity,
    ManyToOne
} from 'typeorm';

import Doctor from './Doctor';
import Patient from './Patient';

import { Models } from '../constants';

@Entity()
export default class Appointment {
    @Column()
    date: Date;

    @ManyToOne(
        type => Doctor,
        doctor => doctor.appointments,
        {
            primary: true,
            nullable: false // can't use as part of composite primary key without this
        }
    )
    doctor: Doctor;

    @ManyToOne(
        type => Patient,
        patient => patient.appointments,
        {
            primary: true,
            nullable: false // can't use as part of composite primary key without this
        }      
    )
    patient: Patient;
}
