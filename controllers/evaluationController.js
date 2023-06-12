const { Evaluation, Document } = require("../models/models");
const uuid = require("uuid")
const path = require("path");

class evaluationController {
  async evaluation(req, res, next) {
    try {
      const { name, surname, phone, exit } = req.body;

      const evaluation = await Evaluation.create({
        name,
        surname,
        phone,
        exit,
      });

      if (req?.files?.documents.length > 1) {
        for (const document of req?.files?.documents) {
          var fileName = uuid.v4() + ".docx"
          document.mv(path.resolve(__dirname, "..", "static/docs", fileName))
  
          await Document.create({
            unique: evaluation.id,
            path: fileName
          });

          const id = evaluation.id

          await Evaluation.findOne({
            where: { id }
          }).then(data => {
            data.update({
              unique: evaluation.id
            })
          })
        }
      } else {
        if (req?.files?.documents) {
          var fileName = uuid.v4() + ".docx"
          req?.files?.documents.mv(path.resolve(__dirname, "..", "static/docs", fileName))
        }

        await Document.create({
          unique: evaluation.id,
          path: fileName ?? null
        });

        const id = evaluation.id

        await Evaluation.findOne({
          where: { id }
        }).then(data => {
          data.update({
            unique: evaluation.id
          })
        })
      }

      return res.json("evaluation");
    } catch (error) {
      console.log(error);
      next();
    }
  }

  async getEvaluation(req, res, next) {
    try {
      const evaluations = await Evaluation.findAll()
      const documents = await Document.findAll()

      return res.json({evaluations, documents})
    } catch (error) {
      next()
    }
  }

  async deleteEvaluation(req, res, next) {
    try {
      const { id } = req.body.params;

      await Evaluation.findOne({
        where: { id },
      }).then((data) => {
        data.destroy();
      });

      return res.json("DONE")
    } catch (error) {
      next()
    }
  }
}

module.exports = new evaluationController();
