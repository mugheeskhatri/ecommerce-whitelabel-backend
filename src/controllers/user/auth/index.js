const { userSchema } = require("../../../models/userModels/user")
const { sendOTP } = require("../../common/nodemailer")

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');



const userRegister = async (req, res) => {
    try {
        const checkUser = await userSchema.find({ email: req.body.email })
        if (checkUser.length === 0) {
            const securePass = await bcrypt.hash(req.body.password, 10)
            req.body.password = securePass;

            const addUser = await new userSchema(req.body)
            addUser.save()
                .then((user) => {
                    const token = jwt.sign({ id: user._id }, "ecommerce_secret")
                    res.status(201).send({
                        token: token,
                        user: user
                    })
                })
        } else {
            res.statue(205).send("User already registered")
        }

    }
    catch (e) {
        res.send(e)
    }

}




const userLogin = (req, res) => {
    try {
        const email = req.body.email
        userSchema.find({ email: email })
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
        var user = await userSchema.findOne({ email: req.body.email })
        if (!user) {
            res.status(205).send("User not registered")
        } else {
            const userId = user._id
            const otp = Math.floor(1000 + Math.random() * 9000);
            user.otp = otp
            const updateUser = await userSchema.findByIdAndUpdate(userId, user)
            sendOTP(req.body.email, otp)
            res.status(201).send("OTP Sent")


            setTimeout(async () => {
                const _id = user._id
                user.otp = null
                const updateUser = userSchema.findByIdAndUpdate(_id, user)
            }, 30000);
        }

    }
    catch (e) {
        console.log(e)
    }
}



const resendOTP = async (req, res) => {
    try {
        const user = await userSchema.findOne({ email: req.body.email })
        if (!user) {
            res.status(205).send("User not registered")
        } else {
            const userId = user._id
            const otp = Math.floor(1000 + Math.random() * 9000);
            user.otp = otp
            const updateUser = await userSchema.findByIdAndUpdate(userId, user)
            sendOTP(req.body.email, otp)
            res.status(201).send("OTP Sent")

            setTimeout(async () => {
                const _id = user._id
                user.otp = null
                const updateUser = userSchema.findByIdAndUpdate(_id, user)
            }, 10000);
        }
    }
    catch (e) {
        console.log(e)
    }
}



const verifyOtp = async (req, res) => {
    try {
        const user = await userSchema.findOne({ otp: req.body.otp })
        if (!user) {
            res.status(205).send("Invalid OTP")
        } else {
            const userId = user._id
            user.otp = null
            const updateUser = await userSchema.findByIdAndUpdate(userId, user)
            res.status(201).send("OTP Success")
        }
    }
    catch (e) {
        console.log(e)
    }
}




const newPassword = async (req, res) => {
    try {
        const user = await userSchema.findOne({ email: req.body.email })
        const userId = user._id
        const securePass = await bcrypt.hash(req.body.password, 10)
        user.password = securePass;
        const updateUser = await userSchema.findByIdAndUpdate(userId, user)
        res.send("Password Changed")
    }
    catch (e) {
        console.log(e)
    }
}




const updateProfile = async (req, res) => {
    try {
        const user = await userSchema.findOne({ email: req.body.email })
        const userId = user._id
        user.name = req.body.name
        user.email = req.body.email
        user.phone = req.body.phone
        user.city = req.body.city
        user.address = req.body.address
        user.image = req.body.image
        const updateUser = await userSchema.findByIdAndUpdate(userId, user)
        res.status(201).send({message:"Profile Updated Successfully",user:user})
    }
    catch (e) {
        console.log(e)
    }
}



const getSingleUser = async (req, res) => {
    try {
        const userSingle = await userSchema.findOne({ _id: req.params.id })
        res.send(userSingle)
    } catch (error) {
        console.log(error)
    }
}



const getAllUsers = async (req, res) => {
    try {
        const users = await userSchema.find()
        res.send(users)
    } catch (error) {
        console.log(error)
    }
}




const findMe = async (req, res) => {
    try {
        jwt.verify(req.headers.token, "ecommerce_secret", function  (err, decoded) {
            const _id =  decoded?.id
            userSchema.findOne({ _id: _id }, async (err, user) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.status(201).send(user)
                }
            }
            )
        });
    } catch (error) {
        console.log(error)
    }
}





module.exports = {
    userRegister,
    userLogin,
    forgotPassword,
    newPassword,
    verifyOtp,
    resendOTP,
    updateProfile,
    getSingleUser,
    getAllUsers,
    findMe
}