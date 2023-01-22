const mongoose = require("mongoose")

const reviewSchema = mongoose.model("reviews", mongoose.Schema({

    message: { type: String },
    stars: { type: String },
    productId: { type: String },
    userId: { type: String },
    orderId: { type: String },
    createdDate: { type: String }

}))



exports.reviewSchema = reviewSchema;