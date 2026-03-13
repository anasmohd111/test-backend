const Order = require("../models/Order");

// Get all the orders with the seller,manufacturer,product and customers details
exports.getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Order.countDocuments();
    const orders = await Order.find()
      .populate("product_id", "product_name price status")
      .populate("seller_id", "name shop_name email phone")
      .populate("customer_id", "name email phone address")
      .populate("manufacturer_id", "name email phone address")
      .skip(skip)
      .limit(limit);

    if (!orders.length)
      return res.status(404).json({ success: false, message: "No orders found" });

    res.status(200).json({
      success: true,
      total,
      page,
      limit,
      total_pages: Math.ceil(total / limit),
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get most ordered products list in decending order
exports.getMostOrderedProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Order.aggregate([
      // Group by product and count orders
      {
        $group: {
          _id: "$product_id",
          total_orders: { $sum: 1 },
          total_quantity: { $sum: "$quantity" },
          total_revenue: { $sum: "$total_price" },
        }
      },

      // Sort by total orders descending
      { $sort: { total_orders: -1 } },

      // Get product details
      { $lookup: { from: "products", localField: "_id", foreignField: "_id", as: "product" } },
      { $unwind: "$product" },

      // Set the output
      {
        $project: {
          _id: 0,
          product_name: "$product.product_name",
          price: "$product.price",
          status: "$product.status",
          total_orders: 1,
          total_quantity: 1,
          total_revenue: 1,
        }
      },
      { $skip: skip },
      { $limit: limit },
    ]);

    if (!products.length)
      return res.status(404).json({ success: false, message: "No orders found" });

    res.status(200).json({ success: true, page, limit, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get total orders & revenue grouped by month.
exports.getOrdersByMonth = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const data = await Order.aggregate([
      // Group by year and month
      {
        $group: {
          _id: {
            year: { $year: "$created_at" },
            month: { $month: "$created_at" },
          },
          total_orders: { $sum: 1 },
          total_revenue: { $sum: "$total_price" },
          total_quantity: { $sum: "$quantity" },
        },
      },
      // Sort by year and month descending
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      // Set output
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: {
            $arrayElemAt: [
              ["", "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"],
              "$_id.month",
            ],
          },
          total_orders: 1,
          total_revenue: 1,
          total_quantity: 1,
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);

    if (!data.length)
      return res.status(404).json({ success: false, message: "No data found" });

    res.status(200).json({ success: true, page, limit, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};