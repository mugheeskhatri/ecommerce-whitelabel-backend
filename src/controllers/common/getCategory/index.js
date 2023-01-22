const { categorySchema } = require("../../../models/adminModels/category")



const getCategory = async (req, res) => {
    try {
        const category = await categorySchema.find()
        res.send(category)
    }
    catch (e) {
        console.log(e)
    }
}



const getSingelCategory = async (req, res) => {
    try {
        const category = await categorySchema.findOne({ _id: req.params.id })
       await res.send(category)
    }
    catch (e) {
        console.log(e)
    }
}




module.exports = {
    getCategory,
    getSingelCategory
}