// Importa o MySQL
const mysql = require('mysql2');
// Carrega as variáveis de ambiente
require('dotenv').config();

// Cria a conexão com base nos dados do .env
const useSsl = process.env.DB_SSL === 'true';

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  ssl: useSsl
    ? {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true,
      }
    : undefined,
});

// Exporta a conexão para ser usada em outros arquivos
module.exports = connection;
