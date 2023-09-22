async function addToCart(req, res) {
  try {
    const { userId, productId, quantity } = req.body;
    const results = await client.query(
      "INSERT INTO cart (userId, productId, quantity) VALUES ($1, $2, $3) RETURNING *",
      [userId, productId, quantity]
    );
    res.json(results.rows[0]);
  } catch (err) {
    res.status(500).send("Server error");
  }
}

async function getCart(req, res) {
  try {
    const { userId } = req.query;
    const results = await client.query("SELECT * FROM cart WHERE userId = $1", [
      userId,
    ]);
    res.json(results.rows);
  } catch (err) {
    res.status(500).send("Server error");
  }
}

async function updateCartItem(req, res) {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const results = await client.query(
      "UPDATE cart SET quantity = $1 WHERE id = $2 RETURNING *",
      [quantity, id]
    );
    res.json(results.rows[0]);
  } catch (err) {
    res.status(500).send("Server error");
  }
}

async function deleteCartItem(req, res) {
  try {
    const { id } = req.params;
    const results = await client.query(
      "DELETE FROM cart WHERE id = $1 RETURNING *",
      [id]
    );
    res.json(results.rows[0]);
  } catch (err) {
    res.status(500).send("Server error");
  }
}

module.exports = { addToCart, getCart, updateCartItem, deleteCartItem };
