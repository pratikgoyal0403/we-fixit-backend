const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const cartController = require("../controller/cart");

router.get("/cart", authMiddleware.authenticateUser, cartController.getCart);
router.post("/cart", authMiddleware.authenticateUser, cartController.addToCart);
router.put(
	"/cart",
	authMiddleware.authenticateUser,
	cartController.deleteFromCart
);

module.exports = router;
