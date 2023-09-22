async function createOrder(req, res) {
  try {
    const { userId } = req.body;
    const cartResults = await client.query(
      "SELECT * FROM cart WHERE userId = $1",
      [userId]
    );
    if (cartResults.rows.length > 0) {
      const orderResults = await client.query(
        "INSERT INTO orders (userId, products) VALUES ($1, $2) RETURNING *",
        [userId, JSON.stringify(cartResults.rows)]
      );
      await client.query("DELETE FROM cart WHERE userId = $1", [userId]);
      res.json(orderResults.rows[0]);
    } else {
      res.status(400).send("Cart is empty");
    }
  } catch (err) {
    res.status(500).send("Server error");
  }
}

module.exports = { createOrder };
