const mysql = require("mysql");
const env = require("dotenv");

env.config({ path: "././.env" });

const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`
const db_connection = mysql.createPool({
  connectionLimit: 10, 
  host: process.env.MYSQLHOST, 
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE, 
  port: process.env.MYSQLHOST
})
db_connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database ");
  }
});

module.exports = db_connection