const router = require("express").Router();

const {
  orderPlace,
  getOrders,
  getOrderByUserId,
  getOrderByOrderNumber,
  getOrderById,
  getOrderByPhone,
  getOrdersInBulk,
} = require("../../../controllers/common/order");

router.post("/order/place", orderPlace);
router.get("/order/get/by-userId/:id", getOrderByUserId);
router.get("/order/get/byPhone/:id", getOrderByPhone);
router.get("/order/track/:id", getOrderByOrderNumber);
router.get("/order/getbyId/:id", getOrderById);
router.post("/orders/getInBulk", getOrdersInBulk);

module.exports = router;
