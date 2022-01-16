const Order = require("../models/order");
const Cart = require("../models/Cart");

exports.getMyOrders = async (req, res) => {
  try {
    const order = await Order.find({ userId: req.userInfo.id });
    res.status(200).json({
      message: "orders fetched successfully",
      response: order,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.postMyOrders = async (req, res) => {
  if (!req.body.address)
    return res.status(400).json({ message: "invalid data" });
  try {
    const services = await req.body.services.map((service) => service._id);
    const grandTotal = await req.body.services.reduce((a, cv) => {
      return a + cv.price;
    }, 0);
    const order = await Order.create({
      userId: req.userInfo.id,
      services,
      grandTotal,
      timestamp: req.body.timestamp,
      address: req.body.address,
      remarks: req.body.remarks,
      bookingDate: req.body.bookingDate,
    });
    if (order) {
      await Cart.deleteOne({ user: req.userInfo.id });
    }
    res.status(201).json({ message: "order created", response: order });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
