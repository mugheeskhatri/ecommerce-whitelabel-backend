const mongoose = require("mongoose")

const orderSchema = mongoose.model("order", mongoose.Schema({
    name: { type: String },
    phone: { type: String },
    city: { type: String },
    description: { type: String },
    netAmount: { type: String },
    grossAmount: { type: String },
    discount: { type: String },
    coupen: { type: String },
    products: { type: Array },
    userId: { type: String },
    address: { type: String },
    payment: { type: String },
    orderNumber: { type: String },
    createdDate: { type: String },
    status: { type: String },
    deliveryCharge: { type: String },
    email: { type: String }
}))



exports.orderSchema = orderSchema;