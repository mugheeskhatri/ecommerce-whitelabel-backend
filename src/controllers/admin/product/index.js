const { productSchema } = require('../../../models/commonModels/product')
// const { multiProductSchema } = require('../../../models/adminModels/multiProduct')
const { categorySchema } = require('../../../models/adminModels/category')
const { flashSaleSchema } = require('../../../models/commonModels/sale/flashSale')


const addProduct = async (req, res) => {
    try {
        const addSingleProduct = new productSchema(req.body)
        addSingleProduct.save()
            .then(async (product) => {
                if (product.categoryId != "null") {
                    const category = await categorySchema.findOne({ _id: product.categoryId })
                    const products = category.products
                    products.unshift(product._id)
                    category.products = products
                    const updateCategory = await categorySchema.findByIdAndUpdate(product.categoryId, category)
                }
                res.status(201).send("Product Added Successfully")
            })
    }
    catch (e) {
        console.log(e)
    }
}



// const addMultiProduct = async (req, res) => {
//     try {
//         const attributes = req.body.attributes
//         var attributesId = []
//         for (var i = 0; i < attributes.length; i++) {
//             const addProductAttribute = new productSchema(attributes[i])
//             addProductAttribute.save()
//                 .then(async (product) => {
//                     attributesId.unshift(product._id)
//                     req.body.attributes = attributesId
//                 })
//         }

//         req.body.reviews = []
//         const addMultiProduct = new multiProductSchema(req.body)
//         addMultiProduct.save()

//         res.status(201).send("Product Added Successfully")
//     }
//     catch (e) {
//         console.log(e)
//     }
// }





const editProduct = async (req, res) => {
    try {
        const editProduct = await productSchema.findByIdAndUpdate(req.params.id, req.body)
        res.send("Product Edited Successfully")
    }
    catch (e) {
        console.log(e)
    }
}


const deleteProduct = async (req, res) => {
    try {

        const product = await productSchema.findById(req.params.id)

        const flashSale = await flashSaleSchema.find()
        const filtered = flashSale[0].products.filter(product => product.value !== req.params.id)
        flashSale[0].products = filtered
        const updateFlashSale = await flashSaleSchema.findByIdAndUpdate(flashSale._id, flashSale[0])


        //delete from category list
        if (product.categoryId !== null && product.categoryId !== "null" && product.categoryId !== undefined && product.categoryId !== "") {
            const category = await categorySchema.findById(product.categoryId)
            const filteredProducts = category.products.filter(product => product.toString() !== req.params.id)
            category.products = filteredProducts
            const updateCategory = await categorySchema.findByIdAndUpdate(product.categoryId, category)
            console.log(req.params.id)
        }


        const deleteProduct = await productSchema.findByIdAndDelete(req.params.id)
        res.send("Product Deleted Successfully")
    }
    catch (e) {
        console.log(e)
    }
}



const deleteMiltiProducts = async (req, res) => {
    try {
        for (var i = 0; i < req.body.products.length; i++) {
            const product = await productSchema.findById(req.body.products[i])

            const flashSale = await flashSaleSchema.find()
            const filtered = flashSale[0].products.filter(product => product.value !== req.body.products[i].id)
            flashSale[0].products = filtered
            const updateFlashSale = await flashSaleSchema.findByIdAndUpdate(flashSale._id, flashSale[0])


            //delete from category list
            if (product.categoryId !== null && product.categoryId !== "null" && product.categoryId !== undefined && product.categoryId !== "") {
                const category = await categorySchema.findById(product.categoryId)
                const filteredProducts = category.products.filter(product => product.toString() !== req.body.products[i].id)
                category.products = filteredProducts
                const updateCategory = await categorySchema.findByIdAndUpdate(product.categoryId, category)
            }


            const deleteProduct = await productSchema.findByIdAndDelete(req.body.products[i])
        }
        res.send("Product Deleted Successfully")
    } catch (error) {
        console.log(error)
    }
}





module.exports = {
    addProduct,
    editProduct,
    deleteProduct,
    deleteMiltiProducts
}