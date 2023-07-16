const User = require("../models/user");
const createError = require("../utils/error");
const validators = require("../validators");
const { generateSession } = require("../utils/session");

const register = async (req, res, next) => {
  try {
    await validators.registerSchema.validateAsync(req.body);
    const { email, password } = req.body;

    const user = new User({ email, password });
    await generateSession(req, res, user);
    await user.save();

    res.status(201).send({ user });
  } catch (error) {
    console.log({ error });

    if (error.name === "MongoServerError" && error.code === 11000) {
      next({ message: "Email is in use!", status: 400 });
    } else {
      next(createError(error));
    }
  }
};

const login = async (req, res, next) => {
  try {
    await validators.loginSchema.validateAsync(req.body);
    const { email, password } = req.body;

    const user = await User.findByCredential(email, password);
    await generateSession(req, res, user);

    res.send({ user });
  } catch (error) {
    next(createError(error));
  }
};

module.exports = {
  register,
  login,
};
