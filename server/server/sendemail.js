
var ejs = require("ejs");
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { convert } = require('html-to-text');

const CLIENT_ID = process.env.CLIENT_ID;
const CLEINT_SECRET = process.env.CLEINT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

exports.sendEmail = (customerEmail, name, phone, address, cart, totalCost)=>{
  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  async function sendMail() {
    try {
      const accessToken = await oAuth2Client.getAccessToken();

      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'glorytaste.shop@gmail.com',
          clientId: CLIENT_ID,
          clientSecret: CLEINT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
      let htmlstr;
      ejs.renderFile("./views" + "/email.ejs", {  
                  name: name,
                  phone: phone,
                  address: address,
                  cart: cart,
                  totalCost: totalCost },
                  function (err,str){
                    htmlstr = str;
                    console.log(str);
                  });
        const mailOptions = {
          from: '"Glory Taste" glorytaste.shop@gmail.com',
          to: customerEmail,
          subject: 'order',
          html: htmlstr

        };
      
       const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
      return error;
    }
  }

  sendMail()
    .then((result) => console.log('Email sent...', result))
    .catch((error) => console.log(error.message));
}