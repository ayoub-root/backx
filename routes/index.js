var express = require('express');
var router = express.Router();
  const nodemailer = require("nodemailer");
var session =require('express-session')
  
/* GET home page. */
router.get('/', function(req, res, next) {
  let transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
       user: 'd7c3ff6627ac8f',
       pass: '36900a68000088'
    }
});

const message = {
    from: 'root@kypinin.com',
    to: 'ayoub.inf30@gmail.com',
    subject: 'Design Your Model S | Tesla',
    html: '<h1>Have the most fun you can in a car!</h1><p>Get your <b>Tesla</b> today!</p>',
   
};
//transport.sendMail(message, function (err, info) {
    console.log(req.session.id)
 //});
  res.json({ title: 'Express',session:req.session });
});




module.exports = router;
