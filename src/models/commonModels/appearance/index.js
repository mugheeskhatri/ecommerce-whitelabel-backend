const mongoose = require("mongoose");

const appearanceSchema = mongoose.model(
  "appearance",
  mongoose.Schema({
    backgroundColor: { type: String },
    contrastBackgroundColor: { type: String },
    primaryLightColor: { type: String },
    secondaryColor: { type: String },
    primaryColor: { type: String },
    sliderImages: { type: Array },
    logo: { type: String },
    currency: { type: String },
    appName: { type: String },
    appTagline: { type: String },
    productCardType: { type: String },
    cartCardType: { type: String },
  })
);

exports.appearanceSchema = appearanceSchema;
