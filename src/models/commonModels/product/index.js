const mongoose = require("mongoose")

const productSchema = mongoose.model("product", mongoose.Schema({

    name: { type: String },
    image: { type: Array },
    shortDescription: { type: String },
    longDescription: { type: String },
    reviews: { type: Array },
    regularPrice: { type: String },
    salePrice: { type: String },
    material: { type: Array },
    stock: { type: String },
    categoryId: { type: String },
    differentSizes: { type: String },
    differentColors: { type: String },
    colorAttributes: { type: Array },
    orders: { type: Array },
    sizeAttributes: { type: Array },
    differentMaterial: { type: String },
    saleId: { type: String }
}))



exports.productSchema = productSchema;