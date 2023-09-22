const { Client } = require("pg");

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

module.exports = {
  client,
  connectDb,
};
