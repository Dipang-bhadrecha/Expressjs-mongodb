const Order = require('../../model/order/Order');

exports.createOrder = async (req, res) => {
  try {
    const {
      orderDate,
      shippingAddress,
      billingAddress,
      items,
      total,
      tax,
      shippingCost,
      grandTotal,
    } = req.body;

    const order = new Order({
      orderDate,
      shippingAddress,
      billingAddress,
      items,
      total,
      tax,
      shippingCost,
      grandTotal,
    });

    await order.save();
    res.status(201).json({ message: "order created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error order create" });
  }
};

// GET ORDER DETAILS

exports.getOrderDetails = async(req, res) => {
  try {
    const result = await Order.aggregate([
      
      {
        $lookup: {
          from : 'orders',
          localField:'',
          foreignField : '_id',
          as : 'OrderData'
        }
      },

      {
        $project: {
         
        },
      },
    ]);
  } catch (error) {
    
  }
};


