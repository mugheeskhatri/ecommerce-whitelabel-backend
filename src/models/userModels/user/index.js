const mongoose = require("mongoose");

const userSchema = mongoose.model(
  "user",
  mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    image: { type: String },
    phone: { type: String },
    otp: { type: String },
    address: { type: String },
    orders: { type: Array },
    notification: { type: Array },
    city: { type: String },
    joiningDate: { type: String },
    cart: { type: Array },
    country: { type: String },
  })
);

exports.userSchema = userSchema;
