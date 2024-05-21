// server.js

// Import required packages
const express = require('express');
const sql = require('mssql');

// Create an instance of the Express application
const app = express();

// Set the port number for the server to listen on
const PORT = process.env.PORT || 3000;

// Configure the Azure SQL database connection
const config = {
  user: 'ayeshamp',
  password: 'music**20',
  server: 'mymp.database.windows.net',
  database: 'MusicPlayer',
  options: {
    encrypt: true
  }
};

// Connect to the Azure SQL database
sql.connect(config, (err) => {
  if (err) {
    console.error('Error connecting to database: ', err);
    return;
  }
  console.log('Connected to Azure SQL database!');
});

// Create an API endpoint for user registration
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // Execute an INSERT SQL query to add the new user to the database
  const query = "INSERT INTO users (username, email, password) VALUES (@username, @email, @password)";
  const request = new sql.Request();
  request.input('username', sql.VarChar, name);
  request.input('email', sql.VarChar, email);
  request.input('password', sql.VarChar, password);

  request.query(query, (err, result) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.status(200).json({ message: 'User registered successfully' });
  });
});

// Create an API endpoint for user login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Execute a SELECT SQL query to retrieve user data based on email and password
  const query = "SELECT * FROM users WHERE email = @email AND password = @password";
  const request = new sql.Request();
  request.input('email', sql.VarChar, email);
  request.input('password', sql.VarChar, password);

  request.query(query, (err, result) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (result.recordset.length === 0) {
      res.status(401).json({ error: 'Invalid email or password' });
    } else {
      const user = result.recordset[0];
      res.status(200).json({ user });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});