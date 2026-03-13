const express = require("express");
const router = express.Router();
const { getAllOrders, getMostOrderedProducts, getOrdersByMonth } = require("../controllers/orderController");

router.get("/most-ordered", getMostOrderedProducts);
router.get("/by-month", getOrdersByMonth);
router.get("/", getAllOrders);

module.exports = router;