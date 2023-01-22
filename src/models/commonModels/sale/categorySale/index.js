const mongoose = require("mongoose")

const categorySaleSchema = mongoose.model("categorySale", mongoose.Schema({
    discountType: { type: String },
    percentOrAmount: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    title: { type: String },
    description: { type: String },
    sliderImages: { type: Array },
    categories: { type: Array }
}))



exports.categorySaleSchema = categorySaleSchema;