// const router = require("express").Router()
// const { coupenSchema } = require("../../../models/adminModels/copen")




// const createCoupen = async (req, res) => {
//     try {
//         const coupen = Math.floor(1000 + Math.random() * 9000);
//         req.body.number = coupen
//         const createCoupen = new coupenSchema(req.body)
//         createCoupen.save()
//             .then(async (coupen) => {
//                 res.status(201).send({ message: "Coupen Created", coupen: coupen.number })
//             })
//     }
//     catch (e) {
//         console.log(e)
//     }
// }



// const getCoupens = async (req, res) => {
//     try {
//         const coupens = await coupenSchema.find()
//         res.send(coupens)
//     }
//     catch (e) {
//         console.log(e)
//     }
// }



// const deleteCoupen = async (req, res) => {
//     try {
//         const deleteCoupen = await coupenSchema.findByIdAndDelete(req.params.id)
//         res.status(201).send("Coupen Deleted")
//     }
//     catch (e) {
//         console.log(e)
//     }
// }



// module.exports = {
//     createCoupen,
//     getCoupens,
//     deleteCoupen
// }
