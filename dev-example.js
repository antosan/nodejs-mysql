require('dotenv').config();

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

connection.connect();

connection.query('SELECT * FROM news', (err, rows, fields) => {
    if (!err) {
        console.log('The solution is: ', rows);
    } else {
        console.log('Error while performing Query');
    }
});

connection.end();