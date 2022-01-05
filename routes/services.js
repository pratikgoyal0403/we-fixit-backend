const router = require("express").Router();

const appController = require("../controller/app");

router.get("/categories", appController.getAllCategories);
router.get("/services/:categoryId", appController.getServicesOfCategory);
router.get("/service/:serviceId", appController.getServiceDetails);

//contact us
router.post("/contact-us", appController.contactus);

module.exports = router;
