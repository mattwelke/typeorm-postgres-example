import { expect } from 'chai';
import { read } from 'fs';
import { createConnection } from 'typeorm';

import { typeOrmConfig } from '../src/config';
import Patient from '../src/models/Patient';

describe('example app', () => {
    it('connects to PG, saves data, and reads it back', async () => {
        // Re-using the seed task as test

        // Override PG config with config from CI/CD env
        (typeOrmConfig as any).host = process.env.POSTGRES_HOST;

        const conn = await createConnection(typeOrmConfig);
        console.log('PG connected.');

        // Create seed data.
        let patient = new Patient();
        patient.name = 'Matt';

        const patientRepo = conn.getRepository(Patient);
        patient = await patientRepo.save(patient); // re-assign to know assigned id
        console.log(`Patient saved. id = ${patient.id}`);

        // Read data back.
        const readBackPatient = await patientRepo.findOneOrFail(patient.id);
        expect(readBackPatient).to.not.be.undefined;
        expect(readBackPatient.id).to.not.be.undefined;
        expect(readBackPatient.id).to.eql(patient.id);
        expect(readBackPatient.name).to.not.be.undefined;
        expect(readBackPatient.name).to.eql('Matt');

        // Close connection
        await conn.close();
        console.log('PG connection closed.');
    });
});
