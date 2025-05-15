const Product = require("../models/Product");
const Cart = require("../models/Cart");

const { STATUS_CODE } = require("../constants/statusCode");

exports.addProductToCart = async (request, response) => {
  const { name, price,description } = request.body;

  // Ürünü MongoDB'ye ekle
  const newProduct = new Product(name, parseFloat(price),description);
  await newProduct.save();

  // Sepetle ilgili işlem (şu an memory içi olabilir)
  Cart.add(name);

  response.status(STATUS_CODE.FOUND).redirect("/products/new");
};

exports.getProductsCount = () => {
  return Cart.getProductsQuantity();
};
