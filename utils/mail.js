const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'harsh.apr318@gmail.com',
    pass: '06570657'
  }
});

function createMail(id,pass,mail){
    //return email-object
    return {
        from: 'harsh.apr318@gmail.com',
        to: mail,
        subject: 'Welcome to our website. Successfully Register',
        text: 'Your login credintials are:\n'+`UserId:${id} \n`+ `Password:${pass}`
    }
  };

  exports.sendMail= (id,pass,mail)=>{
    const mailBody=createMail(id,pass,mail);
    transporter.sendMail(mailBody, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      
  }
  
