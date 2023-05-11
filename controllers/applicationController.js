const ApiError = require("../error/ApiError");
const { Application } = require("../models/models");
const uuid = require("uuid")
const path = require("path")

class ApplicationController {
  async apply (req, res, next) {
    try {
      const { monthly_payment, total, overpayment, sum, month, status, email } = req.body;

      const application = await Application.create({ email, monthly_payment, total, overpayment, sum, month, status });
  
      return res.json("nice try")
    } catch (error) {
      next()      
    }
  }

  async checkApply (req, res, next) {
    try {
      const { email } = req.query
      const application = await Application.findOne({ 
        where: { email },
        order: [['createdAt', 'DESC']] 
      })

      return res.json(application)
    } catch (error) {
      next()      
    }
  }

  async updateApply (req, res, next) {
    try {
      const { salary, email } = req.body
      const { img1, img2 } = req.files

      if (img1) {
        var fileName1 = uuid.v4() + ".jpg"
        img1.mv(path.resolve(__dirname, "..", "static/", fileName1))
      }

      if (img2) {
        var fileName2 = uuid.v4() + ".jpg"
        img2.mv(path.resolve(__dirname, "..", "static/", fileName2))
      }

      const application = await Application.findOne({ 
        where: { email },
        order: [['createdAt', 'DESC']]
      }).then(data => {
        data.update({
          docImg1: fileName1,
          docImg2: fileName2,
          salary: salary,
        })
      })

      return res.json(application)
    } catch (error) {
      next()      
    }
  }

  async getApply (req, res, next) {
    try {
      const application = await Application.findAll({
        where: {
          status: "WAIT"
        }
      })

      // console.log(application);

      return res.json(application)
    } catch (error) {
      next()
    }
  }
}

module.exports = new ApplicationController();
