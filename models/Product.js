const { getDatabase } = require("../database");

class Product {
  constructor(name, price,description) {
    this.name = name;
    this.price = price;
    this.description = description;
  }

  save() {
    const db = getDatabase();
    return db.collection("products").insertOne(this);
  }

  static async getAll() {
    const db = getDatabase();
    return await db.collection("products").find().toArray();
  }

  static async getLast() {
    const db = getDatabase();
    return await db.collection("products")
      .find()
      .sort({ _id: -1 }) // son eklenen
      .limit(1)
      .toArray()
      .then(products => products[0]);
  }

  static async findByName(name) {
    const db = getDatabase();
    return await db.collection("products").findOne({ name });
  }

  static async deleteByName(name) {
    const db = getDatabase();
    return await db.collection("products").deleteOne({ name });
  }
}

module.exports = Product;
