const express = require("express");
const sql = require("mssql");
const session = require("express-session"); // For session management
const bodyParser = require('body-parser'); // For parsing request body

const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');

// Enable all CORS requests
app.use(cors());
// Configure Azure SQL database connection
const config = {
  user: "ayeshamp",
  password: "music**20", // Replace with your actual password
  server: "mymp.database.windows.net",
  database: "MusicPlayer",
  options: {
    encrypt: true,
  },
};

// Connect to Azure SQL database
sql.connect(config, (err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to Azure SQL database!");
});

// Configure session middleware
app.use(
  session({
    secret: "fantasy", // Replace with a strong, random secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to 'true' for production (HTTPS)
  })
);

// Configure body parser middleware to handle JSON request bodies
app.use(bodyParser.json()); // Replace with bodyParser.urlencoded({ extended: true }) if necessary

// Create an API endpoint for user registration (Sign Up)
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body; // Extract data from request body
  console.log("Received registration data:", { username, email, password });

  try {
    // Execute an INSERT query to add the new user to the database
    const query = "INSERT INTO users (name, email, password) VALUES (@username, @email, @password)";
    const request = new sql.Request();
    request.input("username", sql.VarChar, username);
    request.input("email", sql.VarChar, email);
    request.input("password", sql.VarChar, password);

    const result = await request.query(query);
    console.log("Database query result:", result);

    if (result.rowsAffected && result.rowsAffected[0] === 1) {
      res.status(200).json({ message: "User registered successfully" });
    } else {
      res.status(500).json({ error: "Registration failed" });
    }
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create an API endpoint for user login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Execute a SELECT query to validate user credentials
    const query = "SELECT * FROM users WHERE email = @email AND password = @password";
    const request = new sql.Request();
    request.input("email", sql.VarChar, email);
    request.input("password", sql.VarChar, password);

    const result = await request.query(query);

    if (result.recordset.length === 0) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    // Login successful, create session
    const user = result.recordset[0];
    req.session.user = user; // Store user data in session

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// **Security Note:**
// It's crucial to hash passwords before storing them in the database to prevent unauthorized access. Consider using a secure hashing algorithm like bcrypt or scrypt.
