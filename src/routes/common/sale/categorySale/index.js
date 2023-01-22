const {
    createSale,
    deleteSale,
    getSale,
    getSingleSale
} = require('../../../../controllers/common/sale/cattegorySale')
const router = require('express').Router()


router.post('/admin/categorySale/create', createSale)
router.get('/categorySale/get', getSale)
router.get('/categorySale/get/single/:id', getSingleSale)
router.delete('/admin/categorySale/delete/:id', deleteSale)






module.exports = router


