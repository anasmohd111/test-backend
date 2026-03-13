const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    manufacturer_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Manufacturer ID is required"],
      ref: "Manufacturer",
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    status: {
      type: String,
      enum: ["instock", "outofstock", "faulty"],
      default: "instock",
    },
    updated_by: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Product", productSchema);