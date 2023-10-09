const ProductType = require('../../model/product/ProductType');

exports.createProductType = async (req, res) => {
 try{
  const {
    productTypeName,
    color,
  } = req.body;
 

 const productType = new ProductType({
  productTypeName,
  color,
 });

await productType.save();

  res.status(201).json({message: 'ProductType created succesfully',productType});
} catch(error){
  console.log(error);
  res.status(500).json({error: 'server error'});
  }
};
