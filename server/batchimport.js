const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const companies = require("./data/companies.json");
const items = require("./data/items.json");

// This is how we import our companies and items data to the mongodb database.
const initialData = async () => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("ecommerce");
    const result = await db.collection("companies").insertMany(companies);
    const result2 = await db.collection("items").insertMany(items);
    client.close();
    console.log("result", result);
    console.log("result2", result2);
  } catch (err) {
    console.log("ERR", err);
  }
};
initialData();
