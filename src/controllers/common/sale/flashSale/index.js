const { productSchema } = require('../../../../models/commonModels/product')
const { flashSaleSchema } = require('../../../../models/commonModels/sale/flashSale')



const autoDeleteSale = async (_id) => {
    try {
        const deleteSale = await flashSaleSchema.findByIdAndDelete(_id)
        console.log("Sale Deleted")
    } catch (error) {
        console.log(error)
    }
}


const createSale = async (req, res) => {
    try {
        var currentDate = new Date()
        const getSale = await flashSaleSchema.find()
        if (getSale.length >= 1) {
            res.send("Sale Already Created")
        } else {

            const createSale = new flashSaleSchema(req.body)
            createSale.save()
                .then(async (sale) => {
                    res.send("Sale Created")
                    for (var i = 0; i < sale.products.length; i++) {
                        const product = await productSchema.findOne({ _id: sale.products[i].value })
                        product.saleId = sale._id;
                        const updateProduct = await productSchema.findByIdAndUpdate(sale.products[i].value, product)
                    }
                    var endDate = new Date(sale.endDate)
                    const deleteTime = Number(endDate.getTime() - currentDate.getTime())
                    setTimeout(() => {
                        autoDeleteSale(sale._id)
                    }, deleteTime)
                })
        }
    } catch (error) {
        console.log(error)
    }
}



const getSale = async (req, res) => {
    try {
        const sale = await flashSaleSchema.find()
        res.send(sale)
    } catch (error) {
        console.log(error)
    }
}



const deleteSale = async (req, res) => {
    try {
        const deleteSale = await flashSaleSchema.findByIdAndDelete(req.params.id)
            .then(() => {
                res.send("Sale Deleted")
            })

    } catch (error) {
        console.log(error)
    }
}


const getSaleById = async (req, res) => {
    try {
        const sale = await flashSaleSchema.findById(req.params.id)
        if (sale.length === 0) {
            res.status(204).send("Sale not Found")
        } else {
            res.status(202).send(sale)
        }
    } catch (error) {
        console.log(error)
    }
}





module.exports = {
    createSale,
    deleteSale,
    getSale,
    getSaleById
}


