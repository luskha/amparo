// database.js
import Constants from 'expo-constants';
import { Client } from 'pg'; // ou outra biblioteca de conexão ao banco de dados

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = Constants.manifest.extra;

const client = new Client({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  port: Number(PGPORT), // Certifique-se de que o valor é numérico
  ssl: { rejectUnauthorized: false }, // Habilita SSL
});

export default client;
