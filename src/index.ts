// Must be at top
import 'reflect-metadata';

import { createConnection } from 'typeorm';

import { typeOrmConfig } from './config';
import Appointment from './models/Appointment';
import Doctor from './models/Doctor';
import Patient from './models/Patient';

(async () => {
    const conn = await createConnection(typeOrmConfig);
    console.log('PG connected.');

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // App's main content. This could be an Express or Koa web server for example, or even just a Node console app.
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Closing the TypeORM db connection at the end of the app prevents the process from hanging at the end (ex when you
    // use ctrl-c to stop the process in your console, or when Docker sends the signal to terminate the process).
    await conn.close();
    console.log('PG connection closed.');
})();
