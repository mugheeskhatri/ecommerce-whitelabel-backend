const { orderSchema } = require("../../../models/commonModels/order")
const { userSchema } = require("../../../models/userModels/user")
const { notificationSchema } = require("../../../models/commonModels/notification")
const { adminSchema } = require("../../../models/adminModels/admin")
const { productSchema } = require("../../../models/commonModels/product")


function generate(n) {
    var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   

    if (n > max) {
        return generate(max) + generate(n - max);
    }

    max = Math.pow(10, n + add);
    var min = max / 10; // Math.pow(10, n) basically
    var number = Math.floor(Math.random() * (max - min + 1)) + min;

    return ("" + number).substring(add);
}
const orderPlace = async (req, res) => {
    try {
        req.body.status = "Pending"
        req.body.createdDate = new Date()
        req.body.orderNumber = generate(6)
        const order = new orderSchema(req.body)
        order.save()
            .then(async (order) => {
                // create notification
                const notification = {
                    message: `${req.body.name} has ordered on your app`,
                    notificationType: "orderPlaced"
                }

                const createNotification = new notificationSchema(notification)
                createNotification.save()
                    .then(async (notification) => {
                        const admin = await adminSchema.find()
                        const adminSingle = admin[0]
                        const notifications = adminSingle.notifications
                        notifications.unshift(notification._id)
                        adminSingle.notifications = notifications
                        const updateAdmin = await adminSchema.findByIdAndUpdate(adminSingle._id, adminSingle)

                    })




                //add order id to product
                const products = order.products
                for (var i = 0; i < products.length; i++) {
                    const product = await productSchema.findOne({ _id: products[i].productId })
                    const productOrders = product.orders
                    productOrders.unshift(order._id)
                    product.orders = productOrders
                    const updateProduct = await productSchema.findByIdAndUpdate(products[i].id, product)
                }




                // add order to the user
                if (req.body.userId !== "" && req.body.userId !== undefined && req.body.userId !== null && req.body.userId !== "null") {
                    var user = await userSchema.find({ _id: req.body.userId })
                        .exec()
                    if (user) {
                        const userId = user._id
                        const orders = user.orders
                        if (orders !== undefined && orders !== null) {
                            orders.unshift(order._id)
                            user.orders = orders
                            const udpateUser = await userSchema.findByIdAndUpdate(userId, user)
                        }
                        console.log(orders)
                    }
                }

                res.status(201).send("Order Placed Successfully")


            })
    }
    catch (e) {
        console.log(e)
    }
}



const getOrders = async (req, res) => {
    try {
        const orders = await orderSchema.find()
        res.send(orders)
    }
    catch (e) {
        console.log(e)
    }
}

const getCancelledOrders = async (req, res) => {
    try {
        const getOrders = await orderSchema.find()
        const filtered = getOrders.filter(order => order.status === "Cancelled")
        res.send(filtered)
    } catch (error) {
        console.log(error)
    }
}



const getOrderByUserId = async (req, res) => {
    try {
        const orders = await orderSchema.find({ userId: req.params.id })
        res.status(201).send(orders)
    }
    catch (e) {
        res.status(204).send("Error occured")
    }
}




const getOrderByPhone = async (req, res) => {
    try {
        const orders = await orderSchema.find({ phone: req.params.id })
        res.status(201).send(orders)
    }
    catch (e) {
        res.status(204).send("Error Occured")
    }
}




const editOrder = async (req, res) => {
    try {
        const order = await orderSchema.findOne({ _id: req.params.id })
        order.status = req.body.status
        const updateOrder = await orderSchema.findByIdAndUpdate(order._id, order)
        res.status(201).send("Order Updated Successfully")
    } catch (error) {
        res.status(205).send("Error Occured")
    }
}



const getOrderByOrderNumber = async (req, res) => {
    try {
        const order = await orderSchema.findOne({ orderNumber: req.params.id })
        if (!order) {
            res.status(203).send("No order found")
        } else {
            res.status(202).send(order)
        }
    } catch (error) {
        console.log(error)
    }
}


const updateOrderStatus = async (req, res) => {
    try {
        const getOrder = await orderSchema.findById(req.params.id)
        const updateOrderStatus = await orderSchema.findByIdAndUpdate(getOrder._id, req.body)
        res.send("Order Status Updated")
    } catch (error) {
        console.log(error)
    }
}


const deleteOrder = async (req, res) => {
    try {
        const order = await orderSchema.findById(req.params.id)
        const userId = order?.userId
        if (userId !== null && userId !== undefined && userId !== "" && userId !== "null") {
            const user = await userSchema.findById(userId)
            const orders = user.orders
            const filtereredOrders = await orders.filter(id => id !== req.params.id)
            user.orders = orders
            const udpateUser = await userSchema.findByIdAndUpdate(userId, user)
        }
        const deleteOrder = await orderSchema.findByIdAndDelete(req.params.id)
        res.send("Order Deleted")
    } catch (error) {
        console.log(error)
    }
}



const getOrderById = async (req, res) => {
    try {
        const getOrder = await orderSchema.findById(req.params.id)
        res.send(getOrder)
    } catch (error) {
        console.log(error)
    }
}




module.exports = {
    orderPlace,
    getOrders,
    getOrderByUserId,
    getOrderByPhone,
    getOrderByOrderNumber,
    updateOrderStatus,
    deleteOrder,
    getOrderById,
    getCancelledOrders
}