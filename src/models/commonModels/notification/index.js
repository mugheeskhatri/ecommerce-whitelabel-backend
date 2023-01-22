const mongoose = require("mongoose")

const notificationSchema = mongoose.model("notification", mongoose.Schema({
    message: { type: String },
    notificationType: { type: String },
}))



exports.notificationSchema = notificationSchema;