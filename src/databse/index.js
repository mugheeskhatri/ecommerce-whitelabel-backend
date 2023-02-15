const mongoose = require("mongoose");
const databseUrl =
  "mongodb+srv://mughees:mughees@cluster0.jgi2dhz.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(databseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((e) => {
    console.log("errr", e);
  });
