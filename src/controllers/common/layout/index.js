const { layoutSchema } = require('../../../models/commonModels/layout')





const createLayout = async (req, res) => {
    try {
        var findLayout = await layoutSchema.find()
        if (findLayout.length === 0) {
            const createLayout = new layoutSchema(req.body)
            createLayout.save()
                .then(() => {
                    res.send("Layout Added")
                })
        } else  {
            const layoutId = findLayout[0]._id
            const updateLayout = await layoutSchema.findByIdAndUpdate(layoutId, req.body)
                .then(() => {
                    res.send("Layout Updated Successfully")
                })
        }
    } catch (error) {
        console.log(error)
    }
}



const getLayout = async (req, res) => {
    try {
        const layout = await layoutSchema.find()
        res.status(202).send(layout[0])
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    createLayout,
    getLayout
}










