const mongoose = require("mongoose");
const Product = require("./models/product");
const Order = require("./models/Order");

// ← use mongoose.models to prevent overwrite error
const Manufacturer = mongoose.models.Manufacturer || mongoose.model("Manufacturer", new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
}));

const Seller = mongoose.models.Seller || mongoose.model("Seller", new mongoose.Schema({
  name: String,
  shop_name: String,
  email: String,
  phone: String,
  address: String,
}));

const Customer = mongoose.models.Customer || mongoose.model("Customer", new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
}));

const autoSeed = async () => {
  try {
    const existingData = await Manufacturer.countDocuments();
    if (existingData > 0) {
      console.log("Data already exists — skipping seed");
      return;
    }

    const manufacturers = await Manufacturer.insertMany([
      { name: "Samsung Electronics", email: "samsung@gmail.com", phone: "9876543210", address: "Seoul, Korea" },
      { name: "Apple Inc", email: "apple@gmail.com", phone: "9876543211", address: "California, USA" },
      { name: "Sony Corporation", email: "sony@gmail.com", phone: "9876543212", address: "Tokyo, Japan" },
    ]);
    console.log("Manufacturers added");

    const sellers = await Seller.insertMany([
      { name: "John Smith", shop_name: "John Electronics", email: "john@gmail.com", phone: "9876543213", address: "Mumbai, India" },
      { name: "Rahul Store", shop_name: "Rahul Electronics", email: "rahul@gmail.com", phone: "9876543214", address: "Delhi, India" },
    ]);
    console.log("Sellers added");

    const customers = await Customer.insertMany([
      { name: "Alice Johnson", email: "alice@gmail.com", phone: "9876543215", address: "Chennai, India" },
      { name: "Bob Williams", email: "bob@gmail.com", phone: "9876543216", address: "Bangalore, India" },
      { name: "Charlie Brown", email: "charlie@gmail.com", phone: "9876543217", address: "Hyderabad, India" },
    ]);
    console.log("Customers added");

    const products = await Product.insertMany([
      { product_name: "Samsung TV", manufacturer_id: manufacturers[0]._id, price: 49999, status: "instock", updated_by: "John" },
      { product_name: "iPhone 15", manufacturer_id: manufacturers[1]._id, price: 79999, status: "instock", updated_by: "Sarah" },
      { product_name: "Sony Headphones", manufacturer_id: manufacturers[2]._id, price: 9999, status: "faulty", updated_by: "Mike" },
    ]);
    console.log("Products added");

    await Order.insertMany([
      {
        product_id: products[0]._id,
        seller_id: sellers[0]._id,
        customer_id: customers[0]._id,
        manufacturer_id: manufacturers[0]._id,
        quantity: 1,
        total_price: 49999,
        status: "delivered",
        created_at: new Date("2026-01-15"),
      },
      {
        product_id: products[1]._id,
        seller_id: sellers[1]._id,
        customer_id: customers[1]._id,
        manufacturer_id: manufacturers[1]._id,
        quantity: 2,
        total_price: 159998,
        status: "pending",
        created_at: new Date("2026-02-10"),
      },
      {
        product_id: products[2]._id,
        seller_id: sellers[0]._id,
        customer_id: customers[2]._id,
        manufacturer_id: manufacturers[2]._id,
        quantity: 1,
        total_price: 9999,
        status: "cancelled",
        created_at: new Date("2026-03-05"),
      },
    ]);
    console.log("Orders added");

    console.log("All dummy data inserted successfully!");
  } catch (error) {
    console.error("Seeder error:", error);
  }
};

module.exports = autoSeed;