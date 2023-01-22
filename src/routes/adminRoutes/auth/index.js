const {
    adminRegister,
    adminLogin,
    forgotPassword,
    verifyOtp,
    newPassword,
    resendOTP,
    updateProfile
} = require('../../../controllers/admin/auth')
const router = require("express").Router()



router.post("/register", adminRegister)
router.post("/login", adminLogin)
router.post("/forgot-password", forgotPassword)
router.post("/verify-otp",verifyOtp)
router.post("/new-passsword",newPassword)
router.post("/resend-otp",resendOTP)
router.post("/update-profile",updateProfile)




module.exports = router;