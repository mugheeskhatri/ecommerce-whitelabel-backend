const router = require("express").Router()
const {
    getSingelCategory,
    getCategory
} = require('../../../controllers/common/getCategory')





router.get("/category/get", getCategory)
router.get("/category/get/single/:id", getSingelCategory)





module.exports = router