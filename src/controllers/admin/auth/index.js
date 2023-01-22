const { adminSchema } = require("../../../models/adminModels/admin")
const { sendOTP } = require("../../common/nodemailer")

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');



const adminRegister = async (req, res) => {
    try {
        const securePass = await bcrypt.hash(req.body.password, 10)
        req.body.password = securePass;

        const addAdmin = await new adminSchema(req.body)
        addAdmin.save()
        res.send("Admin Added")

    }
    catch (e) {
        res.send(e)
    }

}




const adminLogin = (req, res) => {
    try {
        const email = req.body.email
        adminSchema.find({ email: email })
            .exec()
            .then(async (user) => {
                if (user.length < 1) {
                    res.status(206).send("User Not Found")
                }
                else {
                    const comparePassword = await bcrypt.compare(req.body.password, user[0].password)
                    if (comparePassword) {
                        const token = jwt.sign({ id: user[0]._id }, "ecommerce_secret")
                        res.status(201).send({
                            token: token,
                            user: user[0]
                        })

                    } else {
                        res.status(203).send('The password you entered is wrong')
                    }
                }
            })
            .catch(e => {
                res.status(205).send({ message: "User Not Found", user: 'false' })
            })
    }

    catch (e) {
        console.log(e)
    }
}




const forgotPassword = async (req, res) => {
    try {
        var user = await adminSchema.findOne({ email: req.body.email })
        if (!user) {
            res.status(205).send("User not registered")
        } else {
            const userId = user._id
            const otp = Math.floor(1000 + Math.random() * 9000);
            user.otp = otp
            const updateAdmin = await adminSchema.findByIdAndUpdate(userId, user)
            sendOTP(req.body.email, otp)
            res.status(201).send("OTP Sent")


            setTimeout(async () => {
                const _id = user._id
                user.otp = null
                const updateAdmin = adminSchema.findByIdAndUpdate(_id, user)
            }, 30000);
        }

    }
    catch (e) {
        console.log(e)
    }
}



const resendOTP = async (req, res) => {
    try {
        const user = await adminSchema.findOne({ email: req.body.email })
        if (!user) {
            res.status(205).send("User not registered")
        } else {
            const userId = user._id
            const otp = Math.floor(1000 + Math.random() * 9000);
            user.otp = otp
            const updateAdmin = await adminSchema.findByIdAndUpdate(userId, user)
            sendOTP(req.body.email, otp)
            res.status(201).send("OTP Sent")

            setTimeout(async () => {
                const _id = user._id
                user.otp = null
                const updateAdmin = adminSchema.findByIdAndUpdate(_id, user)
            }, 10000);
        }
    }
    catch (e) {
        console.log(e)
    }
}



const verifyOtp = async (req, res) => {
    try {
        const admin = await adminSchema.findOne({ otp: req.body.otp })
        if (!admin) {
            res.status(205).send("Invalid OTP")
        } else {
            const adminId = admin._id
            admin.otp = null
            const updateAdmin = await adminSchema.findByIdAndUpdate(adminId, admin)
            res.status(201).send("OTP Success")
        }
    }
    catch (e) {
        console.log(e)
    }
}




const newPassword = async (req, res) => {
    try {
        const admin = await adminSchema.findOne({ email: req.body.email })
        const adminId = admin._id
        const securePass = await bcrypt.hash(req.body.password, 10)
        admin.password = securePass;
        const updateAdmin = await adminSchema.findByIdAndUpdate(adminId, admin)
        res.send("Password Changed")

    }
    catch (e) {
        console.log(e)
    }
}




const updateProfile = async (req, res) => {
    try {
        const admin = await adminSchema.findOne({ email: req.body.email })
        const adminId = admin._id
        admin.name = req.body.name
        admin.email = req.body.email
        admin.phone = req.body.phone
        const updateAdmin = await adminSchema.findByIdAndUpdate(adminId, admin)
        res.status(201).send("Profile Updated Successfully")
    }
    catch (e) {
        console.log(e)
    }
}








module.exports = {
    adminRegister,
    adminLogin,
    forgotPassword,
    newPassword,
    verifyOtp,
    resendOTP,
    updateProfile
}