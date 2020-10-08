const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');

const transporter = nodemailer.createTransport({

    host: 'smtp.gmail.com',
    provider: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: 'hp7448538@gmail.com', // Enter here email address from which you want to send emails
        pass: 'potter2020' // Enter here password for email account from which you want to send emails
    },
    tls: {
        rejectUnauthorized: false
    }
});

app.use(bodyParser.json());

app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/',function(req,res){
    res.send('Mailer Server');
})

app.post('/send', function (req, res) {
    console.log(req.body);
    let senderName = req.body.name;
    let senderEmail = req.body.email;
    let senderNumber = req.body.phone;
    let messageSubject = req.body.subject;
    let messageText = req.body.message;

    let mailOptions = {
        to: ['t.t.sephiri@gmail.com'], // Enter here the email address on which you want to send emails from your customers
        from: senderName,
        subject: messageSubject,
        text:`${messageText} \n From \n ${senderName} \n ${senderNumber} \n${senderEmail}` ,
        replyTo: senderEmail
    };

    //console.log(senderEmail,senderName,messageSubject,messageText);

    if (senderName === '') {
        res.status(400);
        res.send({
            message: 'Bad request'
        });
        return;
    }

    if (senderEmail === '') {
        res.status(400);
        res.send({
            message: 'Bad request'
        });
        return;
    }

    if (messageSubject === '') {
        res.status(400);
        res.send({
            message: 'Bad request'
        });
        return;
    }

    if (messageText === '') {
        res.status(400);
        res.send({
            message: 'Bad request'
        });
        return;
    }

    // if (copyToSender) {
    //     mailOptions.to.push(senderEmail);
    // }

    transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            res.end('error');
        } else {
            console.log('Message sent: ', response);
            res.end('sent');
        }
    });
});

app.listen(port, function () {
    console.log('Express started on port: ', port);
});