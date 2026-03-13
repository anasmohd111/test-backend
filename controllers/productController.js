const Product = require("../models/product");

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, errors: messages });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Change status of a product
exports.updateProductStatus = async (req, res) => {
  try {
    const { status, updated_by } = req.body;

    const validStatus = ["instock", "outofstock", "faulty"];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { status, updated_by },
      { new: true }
    );

    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get the faulty products along with the details of who lastupdated the status
exports.getFaultyProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments({ status: "faulty" });
    const products = await Product.find({ status: "faulty" })
      .skip(skip)
      .limit(limit);

    if (!products.length)
      return res.status(404).json({ success: false, message: "No faulty products found" });

    res.status(200).json({
      success: true,
      total,
      page,
      limit,
      total_pages: Math.ceil(total / limit),
      data: products, // updated_by is already inside each product as a string
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};