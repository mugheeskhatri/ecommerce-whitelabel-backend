const mongoose = require("mongoose")

const categorySchema = mongoose.model("category", mongoose.Schema({

    name: { type: String },
    shortDescription: { type: String },
    category: { type: Array },
    images: { type: Array },
    categoryImage: { type: String },
    saleId: { type: String },
    products: { type: Array }

}))



exports.categorySchema = categorySchema;