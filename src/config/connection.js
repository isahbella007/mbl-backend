const mysql = require("mysql");
const env = require("dotenv");

env.config({ path: "././.env" });

const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`
const db_connection = mysql.createConnection(urlDB);
db_connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database ");
  }
});

module.exports = db_connection