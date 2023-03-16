const { appearanceSchema } = require('../../../models/commonModels/appearance')





const createApperance = async (req, res) => {
    try {
        var findAppearance = await appearanceSchema.find()
        if (appearanceSchema.length === 0) {
            const createAppearance = new appearanceSchema(req.body)
            createAppearance.save()
                .then(() => {
                    res.send("Appearance Added")
                })
        } else  {
            const appearanceId = findAppearance[0]._id
            const updateAppearance = await appearanceSchema.findByIdAndUpdate(appearanceId, req.body)
                .then(() => {
                    res.send("Appearance Updated Successfully")
                })
        }
    } catch (error) {
        console.log(error)
    }
}



const getAppearance = async (req, res) => {
    try {
        const appearance = await appearanceSchema.find()
        res.status(200).send(appearance[0])
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    createApperance,
    getAppearance
}










