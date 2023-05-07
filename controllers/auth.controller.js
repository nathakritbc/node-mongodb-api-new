const db = require("../models");
const User = db.users;
const jwt = require("jsonwebtoken");
const passportJWT = require("passport-jwt");
const bcrypt = require("bcrypt");
const saltRounds = 10;
let ExtractJwt = passportJWT.ExtractJwt;
const constants = require("../constants");

require("dotenv").config();
const secretOrKey = process.env.SECRETORKEY;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = secretOrKey;

const getUser = async (obj) => {
  try {
    return await User.findOne(obj).exec();
  } catch (error) {
    return new Promise.reject(error);
  }
};

const createToken = (payload, secretOrKey, expiresIn) => {
  const token = jwt.sign(payload, secretOrKey, {
    expiresIn,
  });
  return token;
};

exports.login = async (req, res) => {
  try {
    const { u_email, u_password } = req.body;
    let user = await getUser({ u_email });

    if (!user) {
      res.status(401).json({ message: constants.kResultNok });
      return;
    }

    const match = await bcrypt.compareSync(u_password, user.u_password);
    if (match) {
      let payload = { id: user.id, u_email };
      let token = createToken(payload, jwtOptions.secretOrKey, "1d");
      // req.session.userId = payload.u_id;
      res.status(200).json({
        message: constants.kResultOk,
        result: { u_email, u_role: user.u_role, token },
      });
      // res.json({ user, payload });
    } else {
      console.error("Password is incorrect");
      res.status(500).json({
        message: constants.kResultNok,
        result: "Password is incorrect",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: constants.kResultNok });
  }
};

exports.register = async (req, res) => {
  try {
    const { u_email, u_password, u_role } = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(u_password, salt);
    const user = new User({ u_email, u_password: hash, u_role: u_role });
    await user.save();

    // product = await product.save();
    res.status(201).json({
      result: user,
      message: constants.kResultOk,
    });
    // res.send(req.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: constants.kResultNok });
  }
};

exports.decodeUser = async (req, res) => {
  try {
    const headers = req;
    const getToken = ExtractJwt.fromAuthHeaderAsBearerToken();
    const token = getToken(headers);
    const user = jwt.decode(token);
    const { id, u_email } = user;
    res.status(200).json({
      user: {
        u_id: id,
        u_email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: constants.kResultNok });
  }
};
