const mongoose = require("mongoose")

const attributeSchema = mongoose.model("attribute", mongoose.Schema({

    sizes: { type: Array },
    materials: { type: Array },
    colors: { type: Array },
   

}))



exports.attributeSchema = attributeSchema;