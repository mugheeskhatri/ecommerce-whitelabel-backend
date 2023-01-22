var bodyParser = require('body-parser')
require('dotenv').config()
const express = require("express")
const app = express()
var cors = require('cors')
const port = process.env.PORT
app.use(express.json())
app.use(cors())
require("./src/databse")



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})




//admin api
app.use("/api/admin", require('./src/routes/adminRoutes/auth'))
app.use("/api/admin", require("./src/routes/adminRoutes/product"))
app.use("/api/admin", require('./src/routes/adminRoutes/category'))
app.use("/api/admin", require('./src/routes/adminRoutes/getOrders'))
app.use("/api/admin/appearance", require("./src/routes/common/appearance"))
app.use("/api/admin", require("./src/routes/adminRoutes/attributes"))
app.use("/api/upload", require("./src/routes/upload"))



//user api

app.use("/api", require("./src/routes/userRoutes/auth"))




//category api
app.use("/api", require('./src/routes/common/getCategory'))



// product api
app.use("/api", require('./src/routes/common/getProduct'))



//order api
app.use("/api", require('./src/routes/common/getOrders'))



//review
app.use("/api", require('./src/routes/common/reviews'))



//coupen api
app.use("/api", require('./src/routes/common/sale/coupen'))


//flash sale
app.use("/api/", require('./src/routes/common/sale/flashSale'))


//category sale
app.use("/api/", require('./src/routes/common/sale/categorySale'))
