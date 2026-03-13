const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const autoSeed = require("./seeder");

const app = express();
connectDB().then(() => {
    autoSeed();
});
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend Running Successfully");
});

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});