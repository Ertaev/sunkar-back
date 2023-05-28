const ApiError = require("../error/ApiError");
const { Application, User } = require("../models/models");
const uuid = require("uuid")
const path = require("path")

class ApplicationController {
  async apply (req, res, next) {
    try {
      const { monthly_payment, total, overpayment, sum, month, email, name = null, surname = null } = req.body;

      const application = await Application.create({ email, monthly_payment, total, overpayment, sum, month, name, surname });
  
      return res.json(application)
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
      const { salary, email, name, surname, IIN } = req.body
      const { img1, img2 } = req.files

      if (img1) {
        var fileName1 = uuid.v4() + ".jpg"
        img1.mv(path.resolve(__dirname, "..", "static/", fileName1))
      }

      if (img2) {
        var fileName2 = uuid.v4() + ".jpg"
        img2.mv(path.resolve(__dirname, "..", "static/", fileName2))
      }

      if (name) {
        await Application.findOne({ 
          where: { email },
          order: [['createdAt', 'DESC']]
        }).then(data => {
          data.update({
            name
          })
        })

        await User.findOne({ 
          where: { email },
        }).then(data => {
          data.update({
            name
          })
        })
      }

      if (surname) {
        await Application.findOne({ 
          where: { email },
          order: [['createdAt', 'DESC']]
        }).then(data => {
          data.update({
            surname
          })
        })

        await User.findOne({ 
          where: { email },
        }).then(data => {
          data.update({
            surname
          })
        })
      }

      const application = await Application.findOne({ 
        where: { email },
        order: [['createdAt', 'DESC']]
      }).then(data => {
        data.update({
          docImg1: fileName1,
          docImg2: fileName2,
          salary: salary,
          IIN,
        })
      })

      return res.json(application)
    } catch (error) {
      next()      
    }
  }

  async getApply (req, res, next) {
    try {
      const applications = await Application.findAll({
        where: {
          status: "WAIT"
        }
      })

      for (const application of applications) {
        console.log(application.dataValues.email);
      }

      return res.json(applications)
    } catch (error) {
      next()
    }
  }

  async updateStatusApply (req, res, next) {
    try {
      const { id, status, comment } = req.body.params

      const application = await Application.findOne({
        where: {
          id
        }
      }).then(data => {
        data.update({
          status,
          comment
        })
      })

      return res.json(application)
    } catch (error) {
      next()
    }
  }
}

module.exports = new ApplicationController();
