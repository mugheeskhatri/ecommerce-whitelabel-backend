const mongoose = require("mongoose")

const adminSchema = mongoose.model("admin", mongoose.Schema({

    name: { type: String },
    email: { type: String },
    password: { type: String },
    image: { type: String },
    phone: { type: String },
    otp: { type: String },
    notifications: { type: Array }

}))



exports.adminSchema = adminSchema;