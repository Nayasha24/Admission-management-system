// server.js
const express = require('express');
const app = express();
const mysql = require('mysql');

// Set up a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: '<mysql_username>',
  password: '<mysql_password>',
  database: '<database_name>'
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});
