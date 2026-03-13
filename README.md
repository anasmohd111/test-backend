# Order Management System – Machine Test

## Overview

This project is a **Machine Test for Order Management System**.
The backend is built using **Node.js** and **MongoDB**.

The system manages products, manufacturers, sellers, customers, and orders.
Products can have statuses such as **in stock, out of stock, or faulty**.
Either **manufacturers or sellers can update the product status**.

When the server starts (`node index.js`), the application automatically creates the required collections and inserts initial data if they do not exist.

---

# Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* Postman (for API testing)

---

# Database Collections

The following collections are created automatically when the project runs:

* Manufacturers
* Sellers
* Customers
* Products
* Orders

---

# Setup Instructions

## 1. Clone the Repository

```bash
git clone https://github.com/yourusername/repository-name.git
cd repository-name
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Run the Server

```bash
node index.js
```

When the server starts:

* Database collections are created automatically
* Initial sample data for manufacturers, sellers, customers, and products is inserted

---

# API Endpoints

## 1. Add Product

Create a new product.

```
POST /api/products
```

---

## 2. Update Product Status

Manufacturers or sellers can update the product status.

```
PUT /api/products/status
```

Statuses:

* instock
* outofstock
* faulty

---

## 3. Get Faulty Products with Last Updated Details

```
GET /api/products/faulty
```

Returns:

* Faulty product details
* Information about **who last updated the status**

---

## 4. Get All Orders with Full Details

```
GET /api/orders
```

Returns orders with:

* Seller details
* Manufacturer details
* Product details
* Customer details

---

## 5. Get Most Ordered Products

```
GET /api/products/most-ordered
```

Returns products sorted in **descending order based on order count**.

---

## 6. Monthly Orders and Revenue

```
GET /api/orders/monthly-report
```

Returns:

* Total orders per month
* Total revenue grouped by month

---

# Pagination

Pagination is implemented for endpoints where large datasets may be returned.

Query Parameters:

```
?page=1
&limit=10
```

---

# Postman Collection

The repository includes a **Postman collection** to easily test all APIs.

---

# Database Backup

A MongoDB database backup file is included in the repository as required by the task.

---

# Author

Mohammad Anas
