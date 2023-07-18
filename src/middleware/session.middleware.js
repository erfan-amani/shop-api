const Session = require("../models/session");
const { clearSession } = require("../utils/session");

const sessionMiddleware = async (req, res, next) => {
  let session;
  try {
    console.log(req.headers.cookie);

    const sessionId = decodeURIComponent(req?.headers?.cookie)
      ?.split?.("=")?.[1]
      ?.split?.("j:")?.[1]
      ?.split?.('"')?.[1];

    console.log({ sessionId });

    if (sessionId) {
      session = await Session.findById(sessionId).populate("user");

      if (!session) {
        throw new Error("No session in database!");
      }

      if (new Date(session.expireAt) - new Date() <= 0) {
        throw new Error("Session expired!");
      }

      req.user = session.user;

      next();
    } else {
      throw new Error("No session in cookie header!");
    }
  } catch (error) {
    console.log({ sessionMiddlewareError: error });

    if (session) {
      await session.deleteOne();
      await clearSession(req, res, sessionId);
    }

    res.status(401).send("Not authorized!");
  }
};

module.exports = sessionMiddleware;
