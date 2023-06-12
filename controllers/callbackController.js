const { Mail } = require("../models/models");

class callbackController {
  async mail(req, res, next) {
    try {
      const { name, phone, comment } = req.body;

      const mail = await Mail.create({ name, phone, comment });

      return res.json("Заказ принят, и отправлен");
    } catch (error) {
      next();
    }
  }

  async getMail(req, res, next) {
    try {
      const allMail = await Mail.findAll();

      return res.json(allMail);
    } catch (error) {
      next();
    }
  }

  async deleteMail(req, res, next) {
    try {
      const { id } = req.body.params;
 
      await Mail.findOne({
        where: { id },
      }).then((data) => {
        data.destroy();
      });

      return res.json("DONE");
    } catch (error) {
      next();
    }
  }
}

module.exports = new callbackController();
