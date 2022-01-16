const router = require("express").Router();
const adminController = require("../controller/admin");
const authMiddleware = require("../middlewares/admin-auth");

/////////////////auth routes

router.get(
  "/active-orders",
  authMiddleware.authenticateAdmin,
  adminController.getActiveOrders
);
router.get(
  "/orders",
  authMiddleware.authenticateAdmin,
  adminController.getAllOrders
);

router.put(
  "/order/:id",
  authMiddleware.authenticateAdmin,
  adminController.changeOrderStatus
);

router.get(
  "/order/:id",
  authMiddleware.authenticateAdmin,
  adminController.getOrderDetail
);

//service & category routes
router.get(
  "/services",
  authMiddleware.authenticateAdmin,
  adminController.getAllServices
);
router.get(
  "/categories",
  authMiddleware.authenticateAdmin,
  adminController.getAllCategories
);
router.post(
  "/services",
  authMiddleware.authenticateAdmin,
  adminController.postService
);
router.post(
  "/categories",
  authMiddleware.authenticateAdmin,
  adminController.postCategory
);
router.put(
  "/services/:serviceId",
  authMiddleware.authenticateAdmin,
  adminController.updateService
);
router.put(
  "/categories/:categoryId",
  authMiddleware.authenticateAdmin,
  adminController.updateCategory
);
router.delete(
  "/services/:serviceId",
  authMiddleware.authenticateAdmin,
  adminController.deleteService
);
router.delete(
  "/categories/:categoryId",
  authMiddleware.authenticateAdmin,
  adminController.deleteCategory
);

module.exports = router;
