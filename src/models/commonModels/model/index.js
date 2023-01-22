const mongoose = require("mongoose")

const layoutSchema = mongoose.model("layout", mongoose.Schema({
    homeLayout: { type: String },
    form: { type: String },
    categoryCard: { type: String },
    productCard: { type: String },
}))



exports.layoutSchema = layoutSchema;