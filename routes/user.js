const router = require("express").Router();

const authController = require("../controller/auth");
const userController = require("../controller/user");
const authMiddleware = require("../middlewares/auth");

router.get(
  "/auto-login",
  authMiddleware.authenticateUser,
  authController.autoLogin
);
// router.post("/request-otp", authController.requestOtp);
router.post("/login", authController.login);
router.post("/signup", authController.signup);
//user profile
router.get("/me", authMiddleware.authenticateUser, userController.getProfile);
router.put(
  "/me",
  authMiddleware.authenticateUser,
  userController.updateProfile
);

// router.post("/signup", authController.register);

////////////////////////////// admin login
router.post("/admin-login", authController.adminLogin);

module.exports = router;
