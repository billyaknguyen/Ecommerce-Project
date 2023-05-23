// Required
require("dotenv").config();

// Mongo config
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//Handles
let currentUserLoggedIn = "";

// Get a cart
const getCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("ecommerce");
    console.log("connected to the ecommerce database");

    const result = await db.collection("cart").find({}).toArray();
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

// Adding item to the cart
const postCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { _id, quantity, numInStock } = req.body;
  const query = { _id };
  //quantity to add to the old one when user add the item in the cart again
  const newQuantity = { $inc: { quantity: quantity } };
  //when the quantity higher than the numInStock reset it to the numInStock
  const resetQuantity = { $set: { quantity: numInStock } };

  try {
    await client.connect();
    const db = client.db("ecommerce");
    console.log("connected to the ecommerce database");

    //checked whether its the item already in the cart;
    //for the situation: user might add the item again;
    const result = await db.collection("cart").findOne({ _id });
    if (!result) {
      //if the item is not existed in the cart yet, add it in the data base
      await db.collection("cart").insertOne(req.body);
    } else {
      //if the item is in the database , add the quantity the user want to buy this time
      if (result.quantity + quantity >= numInStock) {
        //if user add two times the quantity might go over the num in stock so reset the quantity to numInStock
        await db.collection("cart").updateOne(query, resetQuantity);
      } else {
        //when the quantity is not higher than the numInStock then add it to the old one
        await db.collection("cart").updateOne(query, newQuantity);
      }
    }

    console.log("result", result);
    client.close();

    return res.status(200).json({
      status: "success",
      message: "successfully fetch product details ",
      data: req.body,
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: "Error while fetching product details",
    });
  }
};
//update an item in the cart
const updateCartItem = async (req, res) => {
  const { _id, changeNum } = req.body;
  const query = { _id };
  const newQuantity = { $inc: { quantity: changeNum } };
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("ecommerce");
    console.log("connected to the ecommerce database");

    const result = await db.collection("cart").updateOne(query, newQuantity);

    console.log("result", result);
    client.close();

    if (result) {
      return res.status(200).json({
        status: "success",
        message: "successfully updated",
        data: result,
      });
    } else {
      return res
        .status(404)
        .json({ status: "error", message: "unable to find item from cart" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", message: "Error while deleting item" });
  }
};

// Delete an item in the cart

const deleteCartItem = async (req, res) => {
  const { id } = req.params;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("ecommerce");
    console.log("connected to the ecommerce database");
    const result = await db.collection("cart").deleteOne({ _id: Number(id) });
    console.log("result", result);
    client.close();

    if (result) {
      return res.status(200).json({
        status: "success",
        message: "successfully removed item from cart",
        data: result,
      });
    } else {
      return res
        .status(404)
        .json({ status: "error", message: "unable to find item from cart" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", message: "Error while deleting item" });
  }
};

// Handle CreateClient
const createClient = async (req, res) => {
  const userLoginDetails = req.body;
  currentUserLoggedIn = userLoginDetails;

  // check if client exists
  const clientExistsInDb = async (sub) => {
    const clientDb = await getClientDb();
    const client = await clientDb.find({ sub }).limit(1).next();
    return client !== null;
  };

  const getClientDb = async () => {
    const client = new MongoClient(MONGO_URI, options);
    return await client.db().collection("clients");
  };

  const clientExists = await clientExistsInDb(userLoginDetails.sub);
  console.log("clientExists", clientExists);
  // acknowledged
  if (clientExists) {
    console.log("Client already exists in database server side");
    return res
      .status(201)
      .send({ status: "success", data: "Client already exists in database" });
  }

  // if client does not exist add it
  const clientDb = await getClientDb();
  await clientDb.insertOne(userLoginDetails);
  console.log("Client added to database");
  res.status(201).send({ status: "success", data: "Client added to database" });
};

module.exports = {
  getCart,
  updateCartItem,
  deleteCartItem,
  postCart,
  createClient,
};
