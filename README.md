# example-typeorm-postgres

This example demonstrates using TypeORM with PostgreSQL in a Node app. It does not demonstrate creating the web app itself, except for a comment in the ```src/index.ts``` file showing where the app's "main" code would go. This example's purpose is to show how to set up a declarative development environment where team members (or you, in the future) would not need to run manual SQL commands for the local development database to match. Instead, the ```dbseed``` task (implemented as a TypeScript file compiled and executed by the ```build``` NPM task), takes care of ensuring the running database has the required SQL schema and that it is populated with test data.

## System Prerequisites

* Node 9.x+
* Docker and docker-compose

## Models

There are three models in this example:

* Doctor
* Patient
* Appointment (junction model between Doctor and Patient)

## First run

1. Run `npm install` to install local dependencies.
1. Run `docker-compose up -d` to create and start the required Docker containers for the PostreSQL database. Adminer is used for an easy way to access the database. (I'm not a big fan of pgAdmin4.)
1. Run `npm run build` to compile the code, including tasks.
1. Run `npm run dbseed` to insert the seed data into the running PostgreSQL database. Note that since the task is coded in TypeScript, it must be compiled first. Therefore, this npm script runs the **build** npm script first before running the **dbseed** task.

## Next runs

These steps assume you have the docker-compose stack running.

### After changing source code

1. Run `npm run build` to compile the source code.
1. Run `npm start` to start the app.

### After changing seed data

1. Run `npm run dbseed` to compile the source code and insert the seed data into the running PostgreSQL database.
1. Run `npm start` to start the app.
