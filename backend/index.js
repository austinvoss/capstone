const express = require("express");
const bodyParser = require("body-parser");
const { connectDb } = require("./db/connectDB"); // Assuming connectDB.js is in the same directory

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(bodyParser.json());

// Connect to the database
connectDb();

// Use Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Health Check
app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy");
});

// Server Listening
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
