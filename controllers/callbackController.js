var nodemailer = require("nodemailer");

class callbackController {
  async mail(req, res, next) {
    try {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "darhanertaev10@gmail.com",
          pass: "dgevjyjfhdwydyth",
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      var mailOptions = {
        from: "darhanertaev10@gmail.com",
        to: "darhanertaev10@gmail.com",
        subject: "Аренда автомобиля",
        text: `Ваш автомобиль хотят арендовать`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return res.json(error);
        } else {
          return res.json("Заказ принят, и отправлен");
        }
      });
    } catch (error) {
      next();
    }
  }
}

module.exports = new callbackController();
