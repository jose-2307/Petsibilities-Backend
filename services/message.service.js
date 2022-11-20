const { config } = require("./../config/config");
const nodemailer = require("nodemailer");

class MessageService {
  async sendMail(infoMail){
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
          user: config.email,
          pass: config.emailPass,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    await transporter.sendMail(infoMail);
    return { message: "mail sent" };
  }
}

module.exports = MessageService;
