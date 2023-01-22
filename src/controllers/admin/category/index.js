const { categorySchema } = require("../../../models/adminModels/category")
const { productSchema } = require('../../../models/commonModels/product')
const { categorySaleSchema } = require('../../../models/commonModels/sale/categorySale')




const addCategory = async (req, res) => {
    try {
        const category = new categorySchema(req.body)
        category.save()
        res.status(201).send("Category Added")
    }
    catch (e) {
        console.log(e)
    }
}



const updateCategory = async (req, res) => {
    const updateCategory = await categorySchema.findByIdAndUpdate(req.params.id, req)
    res.send("Category Edited")
}



const deleteCategory = async (req, res) => {

    const category = await categorySchema.findOne({ _id: req.params.id })
    const categoryProducts = category.products
    for (var i = 0; i < categoryProducts?.length; i++) {
        const product = await productSchema.findOne({ _id: categoryProducts[i] })
        product.categoryId = ""
        const updateProductCategory = await productSchema.findByIdAndUpdate(categoryProducts[i], product)
    }
    console.log(category)
    if (category.saleId !== null && category.saleId !== undefined && category.saleId !== "null" && category.saleId !== "") {
        const saleId = category.saleId
        const categorySale = await categorySaleSchema.findById(category.saleId)
        const saleCategories = categorySale.categories
        const filteredCategories = saleCategories.filter(category => category.value !== req.params.id)
        categorySale.categories = filteredCategories
        const updateCategorySale = await categorySaleSchema.findByIdAndUpdate(category.saleId, categorySale)
    }

    const deleteCategory = await categorySchema.findByIdAndDelete(req.params.id)
    res.send("Category Deleted")
}










module.exports = {
    addCategory,
    updateCategory,
    deleteCategory
}