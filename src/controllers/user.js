const getProfile = async (req, res, next) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    // await clearSession(req, res, sessionId);

    res.send({ message: "User logout successfully!" });
  } catch (err) {
    console.log({ err });
    next(err);
  }
};

module.exports = { getProfile, logout };
