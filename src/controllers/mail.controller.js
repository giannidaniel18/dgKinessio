
var nodemailer  = require('nodemailer')
const {transport} = require('../lib/helpers')
const mailCtrl = {} 


mailCtrl.sendMail = async (req, res) => {
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

 
    transport.sendMail({
    from: 'e075900243-af6290@inbox.mailtrap.io',
    to: 'giannidaniel92@gmail.com',
    subject: 'Contacto desde la web',
    html: contentHTML
  });


req.flash("success", "Muchas gracias por tu consulta, nos pondremos en contacto a la brevedad");
res.redirect("/contactos");
}



module.exports = mailCtrl;

