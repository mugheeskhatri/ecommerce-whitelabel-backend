const mongoose = require("mongoose")

const coupenSchema = mongoose.model("coupen", mongoose.Schema({
    coupen: { type: String },
    discountType: { type: String },
    percentOrAmount: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    title: { type: String },
    description: { type: String },
    allDeal:{type : String}
}))



exports.coupenSchema = coupenSchema;