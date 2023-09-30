const nodemailer = require('nodemailer')
const isProduction = process.env.NODE_ENV === 'production'

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    }
});


const service = {}

service.sendVerificationEmail = async (email, token, name) => {
    if (isProduction) {
        try {
            await transporter.sendMail({
                from: process.env.SMTP_EMAIL,
                to: email,
                subject: 'Account Verification',
                text: `Hi ${name},\nThanks for creating a Words But With Letters account. Please click on the link below to verify your account.\n\n${process.env.DOMAIN}/#/verify/${email}/${token}`
            })
        } catch (err) {
            throw err
        }
    }
}

module.exports = service