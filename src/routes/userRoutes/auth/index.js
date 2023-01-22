const {
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
} = require('../../../controllers/user/auth')
const router = require("express").Router()



router.post("/user/register", userRegister)
router.post("/user/login", userLogin)
router.post("/user/forgot-password", forgotPassword)
router.post("/user/verify-otp", verifyOtp)
router.post("/user/new-passsword", newPassword)
router.post("/user/resend-otp", resendOTP)
router.post("/user/update-profile", updateProfile)
router.get("/user/getSingle/:id", getSingleUser)
router.get("/user/get-users/all",getAllUsers)
router.get("/getUser/me",findMe)



module.exports = router
