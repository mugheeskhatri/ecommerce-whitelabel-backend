const {
    getAttributes,
    addAttributes
} = require('../../../controllers/admin/attributes')
const router = require("express").Router()




router.get("/attributes/get",getAttributes)
router.post("/attributes/add",addAttributes)




module.exports = router;