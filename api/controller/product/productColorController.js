const ProductColor = require('../../model/product/productColor');

exports.createProductColor = async (req, res)=>{
    try{
        const {
            colorName,
        } = req.body;

        const productColor = new ProductColor({
            colorName,
        });
    await productColor.save();

    res.status(201).json({message: 'color created succesfully', productColor});
    } catch(error){
        console.log(error);
        res.status(500).json({error: 'server error'});
    }
};