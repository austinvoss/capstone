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

module.exports = { signup, login };
