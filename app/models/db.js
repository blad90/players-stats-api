const mysql = require("mysql2");
const dbConfig = require("../config/db.config");

// Creating a DB connection
const connection = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

//Opening the MySQL connection
// connection.connect(error => {
//     if(error) throw error;
//     console.log("Successfully connected to the database.");
// });

module.exports = connection;