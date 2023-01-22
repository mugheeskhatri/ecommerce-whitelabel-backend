const { categorySchema } = require('../../../../models/adminModels/category')
const { categorySaleSchema } = require('../../../../models/commonModels/sale/categorySale')



const autoDeleteSale = async (_id)=>{
    try {
        const deleteSale = await categorySaleSchema.findByIdAndDelete(_id)
        console.log("Sale Deleted")
    } catch (error) {
        console.log(error)
    }
}



const createSale = async (req, res) => {
    try {
        const createSale = new categorySaleSchema(req.body)
        createSale.save()
            .then(async (sale) => {
                for (var i = 0; i < sale.categories.length; i++) {
                    if (sale.categories[i] !== '') {
                        const category = await categorySchema.findOne({ _id: sale.categories[i].value })
                        const categoryId = category._id
                        category.saleId = sale._id
                        const updateCategory = await categorySchema.findByIdAndUpdate(categoryId, category)
                    }
                    var currentDate = new Date()
                    var endDate = new Date(sale.endDate)
                    var deleteDate = Number(endDate.getTime() - currentDate.getTime())
                    setTimeout(()=>{
                            autoDeleteSale(sale._id)
                    },deleteDate)



                }
                res.send("Sale Created")
            })
    } catch (error) {
        console.log(error)
    }
}



const getSale = async (req, res) => {
    try {
        const sale = await categorySaleSchema.find()
        res.send(sale)
    } catch (error) {
        console.log(error)
    }
}



const deleteSale = async (req, res) => {
    try {
        const deleteSale = await categorySaleSchema.findByIdAndDelete(req.params.id)
            .then(() => {
                res.send("Sale Deleted")
            })

    } catch (error) {
        console.log(error)
    }
}


const getSingleSale = async (req, res) => {
    try {
        const getSale = await categorySaleSchema.findOne({_id : req.params.id})
        if(!getSale){
            res.status(205).send("Sale Not Found")
        }else {
            res.status(202).send(getSale)
        }
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    createSale,
    deleteSale,
    getSale,
    getSingleSale
}


