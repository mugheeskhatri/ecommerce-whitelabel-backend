const router = require("express").Router()
const {
    createApperance,
    getAppearance
} = require('../../../controllers/common/appearance')



router.post("/create-update",createApperance)
router.get("/get",getAppearance)


module.exports = router