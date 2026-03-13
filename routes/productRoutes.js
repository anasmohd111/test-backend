const express = require("express");
const router = express.Router();
const { createProduct, updateProductStatus, getFaultyProducts } = require("../controllers/productController");

router.post("/", createProduct);
router.put("/:id/status", updateProductStatus);
router.get("/faulty", getFaultyProducts);

module.exports = router;