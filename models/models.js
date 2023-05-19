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
})

module.exports = {
  User, Application
}
