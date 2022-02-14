const bcrypt = require('bcryptjs');
var nodemailer  = require('nodemailer')
const helpers = {};

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

helpers.matchPassword = async (password, savedPassword) => {

    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (e) {
        
    }
}

// NODEMILER
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

helpers.embebedLink = (link)=>{

  let posicion1 = link.search("=");
  let posicion2 = link.search("&");
  let emebedURL = ""
  if(posicion1 == -1){
    emebedURL = link
  } else if(posicion2 == -1){
    emebedURL = "https://www.youtube.com/embed/"+ link.slice(posicion1 + 1);
  } else {
    emebedURL = "https://www.youtube.com/embed/"+ link.slice(posicion1 + 1, posicion2);
  }
  return emebedURL

}

module.exports = {helpers, transport};

