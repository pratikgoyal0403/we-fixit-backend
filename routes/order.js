const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const orderController = require("../controller/order");

router.get(
	"/orders",
	authMiddleware.authenticateUser,
	orderController.getMyOrders
);

router.post(
	"/order",
	authMiddleware.authenticateUser,
	orderController.postMyOrders
);

module.exports = router;
