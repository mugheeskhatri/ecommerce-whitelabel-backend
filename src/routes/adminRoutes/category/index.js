const {
    updateCategory,
    addCategory,
    deleteCategory
} = require('../../../controllers/admin/category')
const router = require("express").Router()



router.post("/add-category", addCategory)
router.patch("/edit-category/:id", updateCategory)
router.delete("/delete-category/:id", deleteCategory)





module.exports = router;



