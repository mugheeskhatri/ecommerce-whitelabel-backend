const { flashSaleSchema } = require('../../../models/commonModels/sale/flashSale')





const createSale = async (req, res) => {
    try {
        const createSale = new flashSaleSchema(req.body)
        createSale.save()
            .then(() => {
                res.send("Sale Created")
            })
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





module.exports = {
    createSale,
    deleteSale,
    getSale
}


