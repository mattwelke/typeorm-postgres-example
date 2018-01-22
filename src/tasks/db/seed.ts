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
    let patient = new Patient();
    patient.name = 'Matt';

    const patientRepo = conn.getRepository(Patient);
    patient = await patientRepo.save(patient); // re-assign to know assigned id
    console.log(`Patient saved. id = ${patient.id}`);

    // Close connection
    await conn.close();
    console.log('PG connection closed.');

    console.log('Finished dbseed task.');
})();
