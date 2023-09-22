const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("pg");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(bodyParser.json());

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "voss",
  database: "voss",
});

async function connectDb() {
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (err) {
    console.error("Failed to connect to the database", err);
  }
}

connectDb();

// Product Routes
app.get("/products", getProducts);
app.post("/products", createProduct);
app.put("/products/:id", updateProduct);
app.delete("/products/:id", deleteProduct);

// User Routes
app.post("/signup", signup);
app.post("/login", login);

// Product Controllers
async function getProducts(req, res) {
  try {
    const results = await client.query("SELECT * FROM products");
    res.json(results.rows);
  } catch (err) {
    res.status(500).send("Server error");
  }
}

async function createProduct(req, res) {
  try {
    const { name, price } = req.body;
    const results = await client.query(
      "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *",
      [name, price]
    );
    res.json(results.rows[0]);
  } catch (err) {
    res.status(500).send("Server error");
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    const results = await client.query(
      "UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *",
      [name, price, id]
    );
    res.json(results.rows[0]);
  } catch (err) {
    res.status(500).send("Server error");
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const results = await client.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );
    res.json(results.rows[0]);
  } catch (err) {
    res.status(500).send("Server error");
  }
}

// User Controllers
async function signup(req, res) {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const results = await client.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, hashedPassword]
    );
    res.json(results.rows[0]);
  } catch (err) {
    res.status(500).send("Server error");
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const results = await client.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    const user = results.rows[0];
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user.id }, "your_secret_key", {
        expiresIn: "1h",
      });
      res.json({ token });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (err) {
    res.status(500).send("Server error");
  }
}

// Server Listening
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
