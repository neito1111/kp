import { Client } from 'pg';

const client = new Client({
  host: 'localhost',
  port: 5000,
  user: 'postgres',
  password: 'qwe',
  database: 'kursach2'
});

export default client;