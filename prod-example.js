require('dotenv').config();

const express = require('express');
const mysql = require('mysql');

const app = express();

const pool = mysql.createPool({
    connectionLimit: 100, // important
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

function handle_database(req, res) {
    pool.getConnection((err, connection) => {
        if (err) {
            connection.release();
            res.json({
                'code': 100,
                'status': 'Error in connection database',
            });
            return;
        }

        console.log('Connected as id', connection.threadId);
        
        connection.query('SELECT * FROM news', (err, rows) => {
            connection.release();

            if (!err) {
                return res.json(rows);
            }
        });

        connection.on('error', err => {
            res.json({
                'code': 100,
                'status': 'Error in connection database',
            });
            return;
        });
    });
}

app.get('/', (req, res) => {
    handle_database(req, res);
});

app.listen(3000);