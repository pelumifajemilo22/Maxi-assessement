const dotenv = require("dotenv")
const cron = require('node-cron');
var nodemailer = require('nodemailer');
const express = require('express');
var app = express();
dotenv.config()


cron.schedule('0 20  17 * * ', () => {
   transporter.sendMail(mailOptions, function(err, info){
       if(err)
       console.log(err);
       else
       console.log(info)
   })
})
cron.schedule('0 21 1 17 * * ', () => {
   transporter.sendMail(mailOptions, function(err, info){
       if(err)
       console.log(err);
       else
       console.log(info)
   })
})
cron.schedule('0 22 1 17 * * ', () => {
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

 const port = process.env.PORT||5000; 
 app.get('/', (req,res)=>{
    res.send(process.env.PORT)
})

 app.listen(port)
