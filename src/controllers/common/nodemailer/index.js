const nodemailer = require("nodemailer")
const { adminSchema } = require("../../../models/adminModels/admin")



const sendOTP = (email , otp) => {


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'eecommerce507@gmail.com',
            pass: 'acaaosrracnhvpmd'
        }
    });
    var mailOptions = {
        from: 'eecommerce507@gmail.com',
        to: email,
        subject: 'OTP',
        text: `Please enter ${otp} in Ecommerce app to verify your acount`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }

    });

   
}



module.exports = {
    sendOTP
}