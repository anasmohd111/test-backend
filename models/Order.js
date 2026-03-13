const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    manufacturer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Manufacturer" },
    quantity: Number,
    total_price: Number,
    status: { type: String, default: "pending" },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Order", orderSchema);