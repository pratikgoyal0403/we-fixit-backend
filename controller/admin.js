const Categories = require("../models/Category");
const Services = require("../models/services");
const Order = require("../models/order");

exports.getActiveOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $not: { status: "Completed" },
    });
    let updatedOrders = [];
    for (let value of orders) {
      updatedOrders.push(await value.populate("services"));
    }
    res.status(200).json({
      message: "Active orders fetched",
      response: updatedOrders,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Invalid data" });
  }
};

exports.getOrderDetail = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId).populate("services");
    res.status(200).json({ message: "fetched order detail", response: order });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Invalid data" });
  }
};

exports.changeOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    await Order.findByIdAndUpdate(orderId, {
      status: req.body.status,
    });
    const order = await Order.findById(orderId);
    res
      .status(200)
      .json({ message: "status changed successfully", response: order });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Invalid data" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      message: "order fetched successfull",
      response: orders,
    });
  } catch (err) {
    consoel.log(err);
    res.status(500).json({ message: "Internal Server error" });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.find();
    res.status(200).json({
      message: "categories fetched successfully",
      response: categories,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server error" });
  }
};

exports.postCategory = async (req, res) => {
  if (!req.body.title || !req.body.locations)
    return res.status(400).json({ message: "invalid data" });
  try {
    const c = {
      ...req.body,
      locations: req.body.locations.split(","),
      image: req.file.filename,
    };
    const category = await Categories.create(c);
    if (!category)
      return res.status(400).json({ message: "something went wrong" });
    res.status(201).json({
      message: "category created successfully",
      response: category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const id = req.params.categoryId;
    const category = await Categories.findById(id);
    console.log(category);
    if (!category) {
      res.status(400).json({ message: "category not found" });
    }
    const c = {
      title: req.body.title,
      locations: req.body.locations.split(","),
      image: req.file?.filename || req.body.image,
    };
    const updatedCategory = await Categories.findByIdAndUpdate(id, c);
    res
      .status(200)
      .json({ message: "updated successfully", response: updatedCategory });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.categoryId;
    const category = await Categories.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "deleted successfully", response: category });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Services.find();
    res.status(200).json({
      message: "services fetched successfully",
      response: services,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server error" });
  }
};

exports.postService = async (req, res) => {
  if (
    !req.body.category ||
    !req.body.title ||
    !req.body.price ||
    !req.body.features
  )
    return res.status(400).json({ message: "invalid data" });
  console.log(req.body.features.split("\n"));
  try {
    const s = {
      ...req.body,
      image: req.file.filename,
      features: req.body.features.split("\n"),
    };
    const service = await Services.create(s);

    if (!service)
      return res.status(400).json({ message: "something went wrong" });

    const category = await Categories.findByIdAndUpdate(req.body.category, {
      $push: { services: service._id },
    });

    console.log(category);

    res.status(201).json({
      message: "service created successfully",
      response: service,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};
exports.updateService = async (req, res) => {
  try {
    const service = await Services.findById(req.params.serviceId);
    if (!service)
      return res.status(400).json({ message: "service doesn't exists" });
    const s = {
      ...req.body,
      image: req.file?.filename || req.body.image,
      features: req.body.features.split("\n"),
      reviews: req.body.reviews || [],
    };
    const updatedService = await Services.updateOne({ _id: req.body._id }, s);
    res.status(200).json({
      message: "service updated",
      response: updatedService,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal Server error" });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Services.findByIdAndDelete(req.params.serviceId);
    res.status(200).json({
      message: "service deleted successfully",
      response: service,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};
