const Session = require("../models/session");

const generateSession = async (req, res, user) => {
  // expires: 30 days
  const expireAt = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);

  const session = new Session({ user: user._id, expireAt });
  await session.save();

  res.cookie(process.env.APP_COOKIE_NAME, session._id, {
    expires: expireAt,
    httpOnly: true,
    secure: true,
    domain: "localhost",
  });
  req.session.user = user;

  return session;
};

const clearSession = async (req, res) => {
  try {
    res.cookie(process.env.APP_COOKIE_NAME, "", {
      expires: 0,
      httpOnly: true,
      secure: true,
      domain: "localhost",
      overwrite: true,
    });
  } catch (error) {
    console.log({ error });
  }
};

module.exports = { generateSession, clearSession };
