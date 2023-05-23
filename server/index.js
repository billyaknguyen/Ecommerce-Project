"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = 4000;

// import handlers
const {
  getCart,
  updateCartItem,
  deleteCartItem,
  postCart,
  createClient,
} = require("./CartHandler");

const {
  getAllProducts,
  getProductDetail,
  getCategory,
  getCategories,
  getBodyLocations,
  getBodyLocation,
  getCompanies,
  getCompanyById,
} = require("./ItemsHandler");

const { postOrder, getConfirmation, getOrder } = require("./OrderHandler");

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // endpoints
  .get("/products", getAllProducts) // Get all products
  .get("/product/:id", getProductDetail) // Get product detail
  .get("/cart", getCart) // Get cart
  .get("/orders/:id", getOrder) // Get order
  .post("/cart", postCart) // Adding items to the Cart
  .post("/orders", postOrder) // Making an order
  .patch("/cart", updateCartItem) //update item from cart
  .delete("/cart/:id", deleteCartItem) // Delete item from cart
  .get("/confirmation/:id", getConfirmation) // Confirmation page
  .get("/categories", getCategories) // Get all categories
  .get("/category/:id", getCategory) // Get items by category
  .get("/bodylocations", getBodyLocations) // Get all bodylocations
  .get("/bodylocations/:id", getBodyLocation) // Get items by bodylocations
  .get("/companies", getCompanies) // Get all companies
  .get("/company/:id", getCompanyById) // Get companies by ID
  .post("/clients", createClient)
  // sorted items
  // order

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
