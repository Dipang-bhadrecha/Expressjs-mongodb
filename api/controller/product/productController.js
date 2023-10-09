
const Product = require("../../model/product/Product");
const ProductType = require("../../model/product/ProductType");
const ProductColor = require("../../model/product/productColor");
const PRODUCT_CREATED_MESSAGE = require("../../helper/message");
const ERROR_PRODUCT_CREATE = require("../../helper/message");
const ERROR_GETPRODUCT_DETAILS = require("../../helper/message");
const messages = require("../../helper/message");

// Create product
exports.createProduct = async (req, res) => {
  try {
    const {
      productName,
      productPrice,
      productDiscount,
      discountedPrice,
      productImage,
      productType,
    } = req.body;

    const product = new Product({
      productName,
      productPrice,
      productDiscount,
      discountedPrice,
      productImage,
      productType,
    });
    await product.save();
    res.status(201).json({ message: messages.PRODUCT_CREATED_MESSAGE, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: messages.ERROR_PRODUCT_CREATE });
  }
};


// GET PRODUCT DETAILS
exports.getProductwithDetails = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $lookup: {
          from: "producttypes",
          localField: "productType",
          foreignField: "_id",
          as: "productTypeData",
        },
      },
      {
        $lookup: {
          from: "productcolors",
          localField: "productTypeData.color",
          foreignField: "_id",
          as: "productcolorData",
        },
      },
      {
        $project: {
          productName: 1,
          productTypeData: 1,
          productcolorData: 1,
        },
      },
    ]);

    res.status(200).json({ result });

    console.log(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: ERROR_GETPRODUCT_DETAILS });
  }
};

