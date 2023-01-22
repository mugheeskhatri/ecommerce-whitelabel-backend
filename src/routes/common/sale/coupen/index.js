const {
    createCoupen,
    findAllCoupens,
    findCoupen,
    deleteCoupen,
    editCoupen,
    findCoupenById
} = require('../../../../controllers/common/sale/coupen')


const router = require("express").Router()


    
router.post('/admin/coupen/create',createCoupen)
router.get('/admin/coupen/findAll',findAllCoupens)
router.get('/coupen/find/:coupen',findCoupen)
router.get('/admin/coupen/findById/:id',findCoupenById)
router.patch('/admin/coupen/edit/:id',editCoupen)
router.delete('/admin/coupen/delete/:id',deleteCoupen)




module.exports = router;