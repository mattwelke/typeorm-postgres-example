import { expect } from 'chai';
import { createConnection } from 'typeorm';

import { typeOrmConfig } from '../src/config';

import Appointment from '../src/models/Appointment';
import Doctor from '../src/models/Doctor';
import Patient from '../src/models/Patient';

describe('example app', () => {
    it('connects to PG, saves data, and reads it back', async () => {
        // Re-using the seed task as test

        // Override PG config with config from CI/CD env
        (typeOrmConfig as any).host = process.env.POSTGRES_HOST;

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

        expect(readBackPatient.id).to.equal(1);
        expect(readBackPatient.name).to.equal('Joe');
        expect(readBackPatient.appointments).to.not.be.undefined;
        expect(readBackPatient.appointments).to.have.length(1);
        expect(readBackPatient.appointments[0].id).to.equal(1);
        expect(readBackPatient.appointments[0].date.toISOString()).to.equal(appointDate.toISOString());
        expect(readBackPatient.appointments[0].doctor).to.not.be.undefined;
        expect(readBackPatient.appointments[0].doctor.id).to.equal(1);
        expect(readBackPatient.appointments[0].doctor.name).to.equal('Jane');

        console.log(`\nRead back data matches what was saved.`);

        // Close connection
        await conn.close();
        console.log('\nPG connection closed.');
    });
});
