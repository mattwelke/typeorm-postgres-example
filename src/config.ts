// Config that is common to more than one part of the app.

import {
    PostgresConnectionOptions
} from 'typeorm/driver/postgres/PostgresConnectionOptions';

import Appointment from './models/Appointment';
import Doctor from './models/Doctor';
import Patient from './models/Patient';

const typeOrmConfig: PostgresConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "typeormtest",
    password: "password",
    database: "typeormtest",
    synchronize: true,
    logging: false,
    entities: [
        Appointment,
        Doctor,
        Patient
    ]
};

export { typeOrmConfig };
