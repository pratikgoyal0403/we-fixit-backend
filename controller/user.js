const User = require("../models/user");

exports.getProfile = async (req, res) => {
	try {
		const user = await User.findById(req.userInfo.id);
		res.status(200).json({ message: "user details found", response: user });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Internal server error" });
	}
};

exports.updateProfile = async (req, res) => {
	try {
		await User.findByIdAndUpdate(req.userInfo.id, req.body);
		const user = await User.findById(req.userInfo.id);
		res.status(200).json({ message: "profile updated", response: user });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Internal server error" });
	}
};
