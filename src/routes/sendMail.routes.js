var express = require('express');
var router = express.Router();
var nodemailer  = require('nodemailer')

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/send-email', async (req,res) => {
  
  const {name, email, subject, message} =req.body;

  contentHTML = `
  <h1> Información recibida </h1>
  <ul>
    <li>Nombre : ${name} </li>
    <li>Email : ${email}</li>
    <li>Asunto : ${subject}</li>
  </ul>
  <h2> Mensaje recibido </h2>
  <p>${message}</p>
  `;

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    tls: {
      rejectUnauthorized : false
    }
  });


  const info = await transport.sendMail({
    from: 'e075900243-af6290@inbox.mailtrap.io',
    to: 'giannidaniel92@gmail.com',
    subject: 'Contacto desde la web',
    html: contentHTML
  });

 console.log('mensaje enviado', info.messageId)

  
//  res.locals.message = 'err.message';
//  res.render('/');
 res.render('contactos', { message: true })

});


module.exports = router;
