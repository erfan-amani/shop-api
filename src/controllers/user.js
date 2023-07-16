const getProfile = async (req, res, next) => {
  try {
    const user = req.session.user;

    res.send(user);
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    res.send({});
  } catch (err) {
    console.log({ err });
    next(err);
  }
};

module.exports = { getProfile, logout };
