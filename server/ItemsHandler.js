// Required
require("dotenv").config();

// Mongo config
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Get all products
const getAllProducts = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("ecommerce");
    console.log("connected to the ecommerce database");

    const result = await db.collection("items").find({}).toArray();
    client.close();

    return res.status(200).json({
      status: "success",
      message: "successfully fetched all products ",
      data: result,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ status: "error", message: "Error while fetching all products" });
  }
};

// Get a product details
const getProductDetail = async (req, res) => {
  const id = req.params.id;
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("ecommerce");
    console.log("connected to the ecommerce database");

    const result = await db.collection("items").findOne({ _id: Number(id) });

    client.close();

    return res.status(200).json({
      status: "success",
      message: "successfully fetch product details ",
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: "Error while fetching product details",
    });
  }
};

// Get all products by its category
const getCategory = async (req, res) => {
  const category = req.params.id;
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("ecommerce");
    console.log("connected to the ecommerce database");

    const result = await db
      .collection("items")
      .find({ category: category })
      .toArray();

    client.close();

    return res.status(200).json({
      status: "success",
      message: "successfully fetch products by its category ",
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: "Error while fetching product by category",
    });
  }
};
// Get all unique categories
const getCategories = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("ecommerce");
    console.log("connected to the ecommerce database");

    const result = await db.collection("items").find({}).toArray();
    const uniqueCategories = [...new Set(result.map((item) => item.category))];

    client.close();

    return res.status(200).json({
      status: "success",
      message: "successfully fetch all unique categories ",
      data: uniqueCategories,
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: "Error while fetching all unique categories",
    });
  }
};

// Get all unique bodyLocations
const getBodyLocations = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("ecommerce");
    console.log("connected to the ecommerce database");

    const result = await db.collection("items").find({}).toArray();
    const uniqueBodyLocations = [
      ...new Set(result.map((item) => item.body_location)),
    ];

    client.close();

    return res.status(200).json({
      status: "success",
      message: "successfully fetch all unique bodyLocations ",
      data: uniqueBodyLocations,
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: "Error while fetching all unique bodyLocations",
    });
  }
};

// getting the body location part of the items data
const getBodyLocation = async (req, res) => {
  const body = req.params.id;
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("ecommerce");
    console.log("connected to the ecommerce database");

    const result = await db
      .collection("items")
      .find({ body_location: body })
      .toArray();

    client.close();

    return res.status(200).json({
      status: "success",
      message: "successfully fetch products by its bodyLocation ",
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: "Error while fetching product by bodyLocation",
    });
  }
};

// Get companies
const getCompanies = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("ecommerce");
    console.log("connected to the ecommerce database");

    const result = await db.collection("companies").find({}).toArray();
    client.close();

    return res.status(200).json({
      status: "success",
      message: "successfully fetched all companies ",
      data: result,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ status: "error", message: "Error while fetching all companies" });
  }
};

// Get company by id
const getCompanyById = async (req, res) => {
  const company = req.params.id;
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("ecommerce");
    console.log("connected to the ecommerce database");

    const result = await db
      .collection("companies")
      .find({ _id: Number(company) })
      .toArray();

    client.close();

    return res.status(200).json({
      status: "success",
      message: "successfully fetched a company by id ",
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: "Error while fetching a company by id",
    });
  }
};

module.exports = {
  getAllProducts,
  getProductDetail,
  getCategory,
  getCategories,
  getBodyLocations,
  getBodyLocation,
  getCompanies,
  getCompanyById,
};
