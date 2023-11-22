import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {POSTGRES_HOST, POSTGRES_DB, POSTGRES_DB_TEST, POSTGRES_USER, POSTGRES_PASSWORD, ENV, POSTGRES_DB_PORT} = process.env;

let client: Pool;

console.log(POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD);

if(ENV === 'dev') {
    // create a new pool here using the variables.
    client = new Pool({
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        port: parseInt(POSTGRES_DB_PORT as string)
    });
}
else {
    client = new Pool({
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        port: parseInt(POSTGRES_DB_PORT as string)
    });
}

export default client