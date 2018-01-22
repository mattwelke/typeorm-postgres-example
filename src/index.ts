// Must be at top
import 'reflect-metadata';

import { createConnection } from 'typeorm';

import { typeOrmConfig } from './config';
import Appointment from './models/Appointment';
import Doctor from './models/Doctor';
import Patient from './models/Patient';

(async () => {
    const conn = await createConnection(typeOrmConfig);

    console.log('Connected.');

    console.log('Exiting.');
})();