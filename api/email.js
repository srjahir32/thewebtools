var nodemailer = require('nodemailer');

exports.sendmail=function(req,res)
{
    // handle the route at yourdomain.com/sayHello
var email=req.body.email;
var path1 = req.body.path;
console.log("level success",email);
console.log("path",path1);


    // Not the movie transporter!
    var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'satish6073@gmail.com', // Your email id
            pass: 'satish parmar' // Your password
        }
    });
   
  


var mailOptions = {
    from: 'satish6073@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'Email Example', // Subject line
   
    attachments:[
        {   
           // filename: 'satish.vcf',
            path:path1
        }]
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
};
smtpTransport.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
       
    }else{
        console.log('Message sent: ' + info.response);
        
    };
});
}

 