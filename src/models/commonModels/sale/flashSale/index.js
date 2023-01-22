const mongoose = require("mongoose")

const flashSaleSchema = mongoose.model("flashSale", mongoose.Schema({
    discountType: { type: String },
    percentOrAmount: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    title: { type: String },
    description: { type: String },
    products: { type : Array },
    sliderImage: { type: Array }
}))



exports.flashSaleSchema = flashSaleSchema;