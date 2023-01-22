const router = require("express").Router()
const { getOrders, updateOrderStatus , deleteOrder, getCancelledOrders } = require("../../../controllers/common/order")




router.get("/orders/get", getOrders)
router.patch("/order/update/:id",updateOrderStatus)
router.delete("/order/delete/:id",deleteOrder)
router.get("/order/get/cancelled",getCancelledOrders)



module.exports = router



