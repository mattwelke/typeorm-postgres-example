// Code that is used to seed the database.
// Usually, tasks would be at the top level directory for the project. But in this case, we need to compile this task
// before it can be run (it's TypeScript), so I include it in a src/tasks directory.

// Must be at top
import 'reflect-metadata';

import { createConnection } from 'typeorm';

import { typeOrmConfig } from '../../config';
import Appointment from '../../models/Appointment';
import Doctor from '../../models/Doctor';
import Patient from '../../models/Patient';

(async () => {
    console.log('Beginning dbseed task.');

    const conn = await createConnection(typeOrmConfig);
    console.log('PG connected.');

    // Create seed data.
    const doctorRepo = conn.getRepository(Doctor);
    let doctor = new Doctor();
    doctor.name = 'Jane';
    doctor = await doctorRepo.save(doctor); // re-assign to know assigned id
    console.log(`\nDoctor saved. id = ${doctor.id}`);

    const patientRepo = conn.getRepository(Patient);
    let patient = new Patient();
    patient.name = 'Joe';
    patient = await patientRepo.save(patient);
    console.log(`\nPatient saved. id = ${patient.id}`);

    const appointDate = new Date();
    const appointRepo = conn.getRepository(Appointment);
    let appoint = new Appointment();
    appoint.date = appointDate;
    appoint.doctor = doctor;
    appoint.patient = patient;
    appoint = await appointRepo.save(appoint);
    console.log(`\nAppointment saved.`);
    console.log(`  id = ${appoint.id}`);
    console.log(`  date = ${appoint.date}`);

    // Read data back, including relations.
    const patientId = patient.id;
    const readBackPatient = await patientRepo.findOne({
        where: {
            id: patientId,
        },
        relations: {
            appointments: {
                doctor: true,
            },
        },
    });
    console.log(`\nPatient data with relations read back from PG.`);
    console.log(`  id = ${readBackPatient.id}`);
    console.log(`  name = ${readBackPatient.name}`);
    console.log(`  # appointments = ${readBackPatient.appointments.length}`);
    console.log(`  appointment id = ${readBackPatient.appointments[0].id}`);
    console.log(`  appointment date = ${readBackPatient.appointments[0].date}`);
    console.log(`  appointment doctor id = ${readBackPatient.appointments[0].doctor.id}`);
    console.log(`  appointment doctor name = ${readBackPatient.appointments[0].doctor.name}`);

    // Close connection
    await conn.close();
    console.log('\nPG connection closed.');
})();
