const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_tours",
});

db.connect((err) => {
  if (err) {
    console.log("Failed to connect to Database");
    throw err;
  }
  console.log("DB Connected");
});

module.exports = db;
