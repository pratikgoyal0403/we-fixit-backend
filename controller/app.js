const mongoose = require("mongoose");
const Services = require("../models/services");
const Categories = require("../models/Category");

exports.getAllCategories = async (req, res) => {
  try {
    let categories;
    const { location } = req.query;
    if (!Object.keys(req.query).length) {
      categories = await Categories.find();
    } else {
      //jfklafkl/?q=mufjdklsfj&Location=jfkdsjfkls&
      categories = await Categories.find({ locations: { $in: location } });
    }

    res.status(200).json({
      message: "categories fetched successfully",
      response: categories,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

exports.getServicesOfCategory = async (req, res) => {
  try {
    const services = await Services.find({
      category: req.params.categoryId,
    });
    const category = await Categories.findById(req.params.categoryId);
    res
      .status(200)
      .json({ message: "services fetched successfully", response: services });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

exports.getServiceDetails = async (req, res) => {
  const { serviceId } = req.params;
  try {
    const service = await Services.findById(serviceId);
    res
      .status(200)
      .json({ message: "service fetched successfully", response: service });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal Server error" });
  }
};

exports.contactus = async (req, res) => {
  try {
    console.log(req.body.name, req.body.email, req.body.message);
    res.status(200).json({
      message: "success",
      response: {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
