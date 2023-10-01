const nodemailer = require('nodemailer')
const fs = require('fs')
const handlebars = require('handlebars')

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

const readHTMLFile = (path, callback) => {
  fs.readFile(path, {encoding: 'utf-8'}, (err, html) => {
    if (err) {
        callback(err);                 
    }
    else {
        callback(null, html);
    }
  });
};

const service = {}

service.sendVerificationEmail = async (email, token, name) => {
  if (isProduction) {
    console.log(__dirname)
    readHTMLFile(__dirname + '/../templates/EmailVerification.html', async (err, html) => {
      if (err) {
        console.log('error reading file', err)
        return
      }
      const template = handlebars.compile(html);
      const replacements = {
        verification_link: `${process.env.DOMAIN}/#/verify/${email}/${token}`
      };
      const htmlToSend = template(replacements);
      try {
        await transporter.sendMail({
          from: process.env.SMTP_EMAIL,
          to: email,
          subject: 'Account Verification',
          html: htmlToSend
      })
      } catch (err) {
        throw err
      }
    })

  }
}

module.exports = service