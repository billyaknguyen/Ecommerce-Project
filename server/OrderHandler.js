// Required
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const { format } = require("date-fns");

// Mongo config
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//Post an order after paying
const postOrder = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const {
    cartItems,
    cartTotal,
    firstName,
    lastName,
    email,
    address,
    country,
    creditCard,
    expiration,
    cvv,
    userId,
  } = req.body;

  try {
    await client.connect();
    const db = client.db("ecommerce");
    console.log("connected to the ecommerce database");

    for (const item of cartItems) {
      const query = { _id: item._id };
      const newInStockNum = { $inc: { numInStock: -item.quantity } };
      await db.collection("items").updateOne(query, newInStockNum);
    }

    const result = await db.collection("orders").insertOne({
      _id: uuidv4(),
      cartItems,
      cartTotal,
      firstName,
      lastName,
      email,
      address,
      country,
      creditCard,
      expiration,
      cvv,
      userId,
      orderDate: format(new Date(), "yyyy-MM-dd"),
    });
    console.log("result", result);

    const orderId = result.insertedId;
    console.log("orderId", { orderId });

    const getClientId = await db
      .collection("clients")
      .findOne({ sub: userId }, { projection: { _id: 1 } });

    console.log("getClientId", { getClientId });

    const addToClientOrderArray = await db
      .collection("clients")
      .updateOne({ _id: getClientId._id }, { $push: { orders: orderId } });
    console.log("addToClientOrderArray", { addToClientOrderArray });

    const deleteCartItems = await db.collection("cart").deleteMany({});

    console.log(deleteCartItems);
    client.close();

    return res.status(200).json({
      status: "success",
      message: "successfully created order",
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: "Error while creating order",
    });
  }
};

// Get the confirmation order details
const getConfirmation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { id } = req.params;
  try {
    await client.connect();
    const db = client.db("ecommerce");
    console.log("connected to the ecommerce database");

    const result = await db.collection("orders").findOne({ _id: id });
    client.close();

    console.log("result get order", result);
    if (result) {
      return res.status(200).json({
        status: "success",
        message: "successfully fetched the order ",
        data: result,
      });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ status: "error", message: "Error while fetching order" });
  }
};

//Get the order by id

const getOrder = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { id } = req.params;
  try {
    await client.connect();
    const db = client.db("ecommerce");
    console.log("connected to the ecommerce database");

    const result = await db.collection("orders").findOne({ _id: id });
    client.close();

    console.log("result get order", result);
    if (result) {
      return res.status(200).json({
        status: "success",
        message: "successfully fetched the order ",
        data: result,
      });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ status: "error", message: "Error while fetching order" });
  }
};

module.exports = {
  postOrder,
  getConfirmation,
  getOrder,
};
