const users = require("../models/user");
const jwt = require("jsonwebtoken");

exports.authenticateUser = async (req, res, next) => {
	try {
		if (
			!req.headers["x-access-token"] ||
			req.headers["x-access-token"] === ""
		)
			return res.status(400).json({ message: "no token" });
		const token = req.headers["x-access-token"];
		const decode = jwt.decode(token, process.env.JWT_SECRET);
		if (!decode) return res.status(400).json({ message: "please login" });
		req.userInfo = { phone: decode.phone, id: decode.id };
		next();
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Internal server error" });
	}
};
