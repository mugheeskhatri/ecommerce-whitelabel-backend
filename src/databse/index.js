const mongoose = require("mongoose");
const databseUrl = process.env.MONGOOSE_URL
mongoose.connect(databseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected");
})
    .catch((e) => {
        console.log("errr", e);
    })