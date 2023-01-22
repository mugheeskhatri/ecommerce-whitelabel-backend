const {
    createReview,
    getReview,
    getReviewByStars,
    getReviewByProduct,
    deleteReview
} = require('../../../controllers/user/review')
const router = require("express").Router()



router.post("/review/create", createReview)
router.get("/review/get", getReview)
router.get("/review/get/byStars/:id", getReviewByStars)
router.get("/review/get/byProduct", getReviewByProduct)
router.delete("/review/delete/:id", deleteReview)



module.exports = router

