import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2";
const PORT = process.env.MYSQLDB_DOCKER_PORT;
const database = process.env.MYSQLDB_DATABASE;
const user = process.env.MYSQLDB_USER;
const password = process.env.MYSQLDB_ROOT_PASSWORD;

const db = mysql.createConnection({
  host: "mysqldb",
  port: PORT,
  user: "user",
  password: "user",
  database: "mydb",
});

export default db;
