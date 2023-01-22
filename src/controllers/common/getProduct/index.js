const { productSchema } = require("../../../models/commonModels/product")



const getProduct = async (req, res) => {
    try {
        const getProduct = await productSchema.find()
        res.send(getProduct)
    }
    catch (e) {
        console.log(e)
    }
}


const getProductByCategory = async (req, res) => {
    try {
        const getProduct = await productSchema.find({ categoryId: req.params.id })
        res.send(getProduct)
    }
    catch (e) {
        console.log(e)
    }
}



const getProductSingle = async (req, res) => {
    try {
        const product = await productSchema.findOne({ _id: req.params.id })
        res.send(product)
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    getProduct,
    getProductByCategory,
    getProductSingle
}