const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");

const generateJwt = (id, phone, IIN, email, name, surname, birthday, role) => {
  return jwt.sign(
    { id, phone, IIN, email, name, surname, birthday, role },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  )
}

class UserController {
  async registration(req, res, next) {
    const { email, phone, IIN, password, name = "", surname = "", birthday = null, role } = req.body;

    if (!email || !IIN || !phone || !password) {
      return next(ApiError.badRequest("Заполните все поля"));
    }

    let candidate = await User.findOne({ where: { email } });

    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким email уже существует")
      );
    }

    candidate = await User.findOne({ where: { phone } });

    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким телефоном уже существует")
      );
    }

    candidate = await User.findOne({ where: { IIN } });

    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким ИИН уже существует")
      );
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, phone, IIN, name, surname, birthday, role, password: hashPassword });
    const token = generateJwt(user.id, user.phone, user.IIN, user.email, user.name, user.surname, user.birthday, user.role);

    return res.json({token})
  }

  async login(req, res, next) {
    const {email, password} = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return next(ApiError.badRequest("Пользователь не найден"))
    }

    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.badRequest("Указан неверный пароль"))
    }

    const token = generateJwt(user.id, user.phone, user.IIN, user.email, user.name, user.surname, user.birthday, user.role)
    return res.json({token})
  }

  async check(req, res, next) {
    try {
      const { email } = req.user
      const user = await User.findOne({ where: { email } })

      const token = generateJwt(user.id, user.phone, user.IIN, user.email, user.name, user.surname, user.birthday, user.role)
      
      return res.json({ token })
    } catch (error) {
      next()
    }
  }

  async update(req, res, next) {
    try {
      const { name, surname, birthday } = req.body;
      const { email } = req.query.email

      if (name) {
        await User.findOne({
          where: { email }
        }).then(data => {
          data.update({
            name: name,
          })
        })
        console.log("first if");
      }

      if (surname) {
        await User.findOne({
          where: { email }
        }).then(data => {
          data.update({
            surname: surname,
          })
        })
        console.log("second if");
      }

      if (birthday !== null) {
        await User.findOne({
          where: { email }
        }).then(data => {
          data.update({
            birthday: birthday,
          })
        })
        console.log("third if", birthday);
      }

      const user = await User.findOne({ where: { email } })

      const token = generateJwt(user.id, user.phone, user.IIN, user.email, user.name, user.surname, birthday, user.role);
      return res.json({token})
    } catch (error) {
      next()
    }
  }
}

module.exports = new UserController();
