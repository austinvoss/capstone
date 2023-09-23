const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "voss",
  database: "voss",
});

const connectDb = async () => {
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (err) {
    console.error("Failed to connect to the database", err);
  }
};

module.exports = { connectDb, client };
