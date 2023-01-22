const router = require("express").Router()
const { 
    getProduct ,
    getProductSingle,
    getProductByCategory
 } = require("../../../controllers/common/getProduct")




router.get("/products/get", getProduct)
router.get("/product/get/category/:id",getProductByCategory)
router.get("/product/get/single/:id",getProductSingle)




module.exports = router









