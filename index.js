const cron = require('node-cron');
var nodemailer = require('nodemailer');
const express = require('express');
var app = express();


cron.schedule('0 10 22 16 * * ', () => {
   transporter.sendMail(mailOptions, function(err, info){
       if(err)
       console.log(err);
       else
       console.log(info)
   })
})
cron.schedule('0 15 22 16 * * ', () => {
   transporter.sendMail(mailOptions, function(err, info){
       if(err)
       console.log(err);
       else
       console.log(info)
   })
})
cron.schedule('0 16 22 16 * * ', () => {
   transporter.sendMail(mailOptions, function(err, info){
       if(err)
       console.log(err);
       else
       console.log(info)
   })
})


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'geotim199422@gmail.com',
        pass: 'march221994'
    }
});

const mailOptions = {
    from: 'pfajemilo@gmail.com',
    to: "geotim199422@gmail.com",
    subject: 'Interview Assessment',
    html: '<p>Maxitech is an IT company that focuses on Ecommerce and investment</p>'
}
app.listen(4000)
