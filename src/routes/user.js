const userRouter = require("express").Router();

const userController = require("../controllers/user");
const sessionMiddleware = require("../middleware/session.middleware");

userRouter.get("/profile", sessionMiddleware, userController.getProfile);
userRouter.get("/logout", userController.logout);

module.exports = userRouter;
