const express = require("express");
const router = express.Router();
const { createOrder } = require("../controllers/orderControllers");

router.post("/", createOrder);

module.exports = router;
