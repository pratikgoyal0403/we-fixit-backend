const mongoose = require("mongoose");
const Cart = require("../models/Cart.js");

exports.getCart = async (req, res) => {
	try {
		const response = await Cart.findOne({ user: req.userInfo.id });
		const cart = await response.populate("services");
		console.log(cart);
		res.status(200).json({ message: "cart fetched", response: cart });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Internal server error" });
	}
};

exports.addToCart = async (req, res) => {
	if (!req.body.serviceId)
		return res.status(400).json({ message: "invalid data" });
	try {
		let cart = await Cart.findOne({ user: req.userInfo.id });
		if (!cart) {
			let cart = await Cart.create({
				user: req.userInfo.id,
				services: [req.body.serviceId],
			});
			return res
				.status(201)
				.json({ message: "cart created succesfully", cart });
		}
		console.log(mongoose.Types.ObjectId(req.body.serviceId));
		const updatedCart = await Cart.updateOne(
			{ user: req.userInfo.id },
			{
				$push: {
					services: mongoose.Types.ObjectId(req.body.serviceId),
				},
			}
		);
		res.status(200).json({ message: "done", response: updatedCart });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

exports.deleteFromCart = async (req, res) => {
	if (!req.body.serviceId)
		return res.status(400).json({ message: "invalid data" });
	try {
		const response = await Cart.findOne({ user: req.userInfo.id });
		if (!response) {
			return res.status(400).json({ message: "cart not found" });
		}
		response.services = response.services.filter(
			(s) => s != req.body.serviceId
		);
		const updatedCart = await response.save();
		const result = await updatedCart.populate("services");
		res.status(200).json({ message: "done", response: result });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
