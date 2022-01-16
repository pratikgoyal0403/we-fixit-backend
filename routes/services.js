const router = require("express").Router();

const appController = require("../controller/app");
const userAuth = require("../middlewares/auth");

router.get("/categories", appController.getAllCategories);
router.get("/services/:categoryId", appController.getServicesOfCategory);
router.get("/service/:serviceId", appController.getServiceDetails);
router.post(
  "/review/:serviceId",
  userAuth.authenticateUser,
  appController.postReview
);
//contact us
router.post("/contact-us", appController.contactus);

module.exports = router;
