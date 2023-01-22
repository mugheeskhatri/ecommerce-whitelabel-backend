const {
    addProduct,
    editProduct,
    deleteProduct,
    deleteMiltiProducts
} = require('../../../controllers/admin/product')
const router = require("express").Router()



router.post("/add-product", addProduct)
router.post("/edit-product/:id", editProduct)
router.delete("/delete-product/:id", deleteProduct)
router.post("/delete/products/multi", deleteMiltiProducts)





module.exports = router;