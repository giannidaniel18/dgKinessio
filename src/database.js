const mysql = require("mysql");
const { promisify } = require("util");
const { readFile } = require("node:fs/promises");

const database = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // ssl: { ca: readFile(__dirname + "../cacert.pem") },
};

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("LA CONEXION A LA BASE DE DATOS FUE CERRADA");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("LA BASE DE DATOS TIENE MULTIPLES CONEXIONES");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("LA CONEXION CON LA BASE DE DATOS FUE RECHAZADA");
    }
  }

  if (connection) connection.release();
  console.log("BASE DE DATOS CONECTADA");
  return;
});

pool.query = promisify(pool.query);
module.exports = pool;
//
