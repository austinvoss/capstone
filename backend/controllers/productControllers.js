const { client } = require("../db/connectDB");

async function getProducts(req, res) {
  try {
    const results = await client.query("SELECT * FROM products");
    res.json(results.rows);
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).send("Server error");
  }
}

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `SELECT * FROM products WHERE id = ${id}`;
    const { rows } = await client.query(query);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
