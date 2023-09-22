const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  updateCartItem,
  deleteCartItem,
} = require("../controllers/cartControllers");

router.post("/", addToCart);
router.get("/", getCart);
router.put("/:id", updateCartItem);
router.delete("/:id", deleteCartItem);

module.exports = router;
