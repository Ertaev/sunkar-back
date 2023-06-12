const sequelize = require("../db")
const { DataTypes } = require("sequelize")

const User = sequelize.define("user", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true},
  phone: {type: DataTypes.STRING, unique: true},
  IIN: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: "USER"},
  name: {type: DataTypes.STRING, defaultValue: ""},
  surname: {type: DataTypes.STRING, defaultValue: ""},
  birthday: {type: DataTypes.DATE, defaultValue: null},
})

const Application = sequelize.define("application", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
  surname: {type: DataTypes.STRING},
  IIN: {type: DataTypes.STRING, unique: true},
  email: {type: DataTypes.STRING},
  monthly_payment: {type: DataTypes.FLOAT},
  total: {type: DataTypes.FLOAT},
  overpayment: {type: DataTypes.FLOAT},
  sum: {type: DataTypes.INTEGER},
  month: {type: DataTypes.INTEGER},
  status: {type: DataTypes.STRING, defaultValue: "WAIT"},
  docImg1: {type: DataTypes.STRING},
  docImg2: {type: DataTypes.STRING},
  salary: {type: DataTypes.INTEGER},
  comment: {type: DataTypes.STRING},
  program: {type: DataTypes.STRING},
  person: {type: DataTypes.STRING, defaultValue: ""},
  BIN: {type: DataTypes.STRING, unique: true},
  file: {type: DataTypes.STRING},
})

const Mail = sequelize.define("mail", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, defaultValue: ""},
  phone: {type: DataTypes.STRING, unique: true},
  comment: {type: DataTypes.STRING, defaultValue: ""},
})

const Evaluation = sequelize.define("evaluation", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
  surname: {type: DataTypes.STRING},
  phone: {type: DataTypes.STRING},
  exit: {type: DataTypes.BOOLEAN},
  unique: {type: DataTypes.STRING, defaultValue: "" },
})

const Document = sequelize.define("document", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  unique: {type: DataTypes.STRING},
  path: {type: DataTypes.STRING},
})

module.exports = {
  User, Application, Mail, Evaluation, Document
}
