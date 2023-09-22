const express = require("express");
const { Client } = require("pg");

const app = express();

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

app.get("/ping", (req, res) => {
  res.send("pong");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
