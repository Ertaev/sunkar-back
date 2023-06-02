var nodemailer = require("nodemailer");

class callbackController {
  async mail(req, res, next) {
    try {
      const {name, phone, comment} = req.body

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
        subject: "Обратная связь",
        text: `Пользователь: ${name ? name : "Аноним" } \n${comment} \nДля обратной связи: ${phone}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res.json(error);
        } else {
          return res.json("Заказ принят, и отправлен");
        }
      });

      // transporter.sendMail(mailOptions);
      // return res.json("Заказ принят, и отправлен");
    } catch (error) {
      next();
    }
  }
}

module.exports = new callbackController();
