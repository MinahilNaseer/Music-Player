const express = require("express");
const sql = require("mssql");
const session = require("express-session");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware and configurations
app.use(cors({
  origin: 'http://localhost:3000' && 'http://192.168.18.126:3000/', 
  credentials: true,
}));

const config = {
  user: "ayeshamp",
  password: "music**20",
  server: "mymp.database.windows.net",
  database: "MusicPlayer",
  options: {
    encrypt: true,
  },
};

sql.connect(config, (err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to Azure SQL database!");
});

app.use(
  session({
    secret: "fantasy",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(bodyParser.json());

// User registration route
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Received registration data:", { username, email, password });

  try {
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

// User login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = "SELECT * FROM users WHERE email = @email AND password = @password";
    const request = new sql.Request();
    request.input("email", sql.VarChar, email);
    request.input("password", sql.VarChar, password);

    const result = await request.query(query);

    if (result.recordset.length === 0) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const user = result.recordset[0];
    req.session.user = user;

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get user info route
app.get("/getUserInfo", (req, res) => {
  if (req.session.user) {
    res.status(200).json(req.session.user);
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Update user info route
app.put("/updateUser", async (req, res) => {
  if (!req.session.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { username, email, password } = req.body;

  try {
    const query = `
      UPDATE users 
      SET 
        name = @username,
        email = @email,
        password = @password
      WHERE 
        id = @userId
    `;
    const request = new sql.Request();
    request.input("username", sql.VarChar, username);
    request.input("email", sql.VarChar, email);
    request.input("password", sql.VarChar, password);
    request.input("userId", sql.Int, req.session.user.id); 

    const result = await request.query(query);

    if (result.rowsAffected && result.rowsAffected[0] === 1) {
      req.session.user.name = username;
      req.session.user.email = email;
      res.status(200).json({ message: "User information updated successfully" });
    } else {
      res.status(500).json({ error: "Failed to update user information" });
    }
  } catch (error) {
    console.error("Update user information error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Favorite songs routes
app.post('/api/favorites', async (req, res) => {
  try {
    const { title, artist, imageUrl, audioUrl, userId } = req.body;
    const request = new sql.Request();
    const query = `
      INSERT INTO LikedSongs (title, artist, imageUrl, audioUrl, userId)
      VALUES (@title, @artist, @imageUrl, @audioUrl, @userId)
    `;
    request.input('title', sql.NVarChar, title);
    request.input('artist', sql.NVarChar, artist);
    request.input('imageUrl', sql.NVarChar, imageUrl);
    request.input('audioUrl', sql.NVarChar, audioUrl);
    request.input('userId', sql.Int, userId);
    const result = await request.query(query);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.get('/api/favorites', async (req, res) => {
  try {
    const request = new sql.Request();
    const result = await request.query('SELECT * FROM LikedSongs');
    res.send(result.recordset);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; 
