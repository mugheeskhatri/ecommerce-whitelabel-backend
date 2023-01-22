const { coupenSchema } = require('../../../../models/commonModels/sale/coupen')



function generate(n) {
    var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   

    if (n > max) {
        return generate(max) + generate(n - max);
    }

    max = Math.pow(10, n + add);
    var min = max / 10; // Math.pow(10, n) basically
    var number = Math.floor(Math.random() * (max - min + 1)) + min;

    return ("" + number).substring(add);
}



const autoDeleteCoupen = async (_id) => {
    try {
        const deleteCoupen = await coupenSchema.findByIdAndDelete(_id)
        console.log("Coupen Deleted")
    } catch (error) {
        console.log(error)
    }
}





const createCoupen = async (req, res) => {
    try {
        req.body.coupen = generate(6)
        const createCoupen = new coupenSchema(req.body)
        createCoupen.save()
            .then((coupen) => {
                res.send({
                    status: "Coupen Created",
                    coupen: coupen
                })
                var currentDate = new Date()
                var endDate = new Date(coupen.endDate)
                var deleteDate = Number(endDate.getTime() - currentDate.getTime())
                setTimeout(() => {
                    autoDeleteCoupen(coupen._id)
                }, deleteDate)

            })
    } catch (error) {
        console.log(error)
    }
}



const deleteCoupen = async (req, res) => {
    try {
        const deleteCoupen = await coupenSchema.findByIdAndDelete(req.params.id)
        res.status(202).send("Coupen Deleted Successfully")
    } catch (error) {
        console.log(error)
    }
}




const findAllCoupens = async (req, res) => {
    try {
        const findAll = await coupenSchema.find()
        res.status(202).send(findAll)
    } catch (error) {
        console.log(error)
    }
}








const findCoupen = async (req, res) => {
    try {
        const findCoupen = await coupenSchema.findOne({ coupen: req.params.coupen })
        if (!findCoupen) {
            res.status(206).send("No coupen found")
        } else {
            res.status(202).send(findCoupen)
        }
    } catch (error) {
        console.log(error)

    }

}



const findCoupenById = async (req, res) => {
    try {
        const findCoupen = await coupenSchema.findOne({ _id: req.params.id })
        if (!findCoupen) {
            res.status(206).send("No coupen found")
        } else {
            res.status(202).send(findCoupen)
        }
    } catch (error) {
        console.log(error)

    }
}


const editCoupen = async (req, res) => {
    try {
        const coupen = await coupenSchema.findById(req.params.id)
        const updateCoupen = await coupenSchema.findByIdAndUpdate(coupen._id, req.body)
        res.status(202).send("Coupen Updated Successfully")
    } catch (error) {
        console.log(error)
    }
}






module.exports = {
    createCoupen,
    findAllCoupens,
    findCoupen,
    deleteCoupen,
    findCoupenById,
    editCoupen
}




