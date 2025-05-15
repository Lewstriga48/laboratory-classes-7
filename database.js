const { MongoClient } = require('mongodb');
const { DB_USER, DB_PASS } = require('./config');

const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.71kxwjd.mongodb.net/?retryWrites=true&w=majority`;


let database;

async function mongoConnect(callback) {
  try {
    const client = await MongoClient.connect(uri);
    database = client.db('shop');
    console.log("Connection to the database has been established.");
    callback();
  } catch (err) {
    console.error(err);
  }
}

function getDatabase() {
  if (!database) {
    throw new Error("No database found.");
  }
  return database;
}

module.exports = { mongoConnect, getDatabase };
