const router = require("express").Router()

const {
    orderPlace,
    getOrders,
    getOrderByUserId,
    getOrderByOrderNumber,
    getOrderById,
    getOrderByPhone } = require("../../../controllers/common/order")



router.post("/order/place", orderPlace)
router.get("/order/get/by-userId/:id", getOrderByUserId)
router.get("/order/get/byPhone/:id", getOrderByPhone)
router.get("/order/track/:id",getOrderByOrderNumber)
router.get("/order/getbyId/:id",getOrderById)



module.exports = router