const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
var cors = require("cors");
require("dotenv").config();
require("./db/mongoose");

const app = express();

app.use(cors({ origin: "*", credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(function (req, res, next) {
  if (req.method === "OPTIONS") {
    var headers = {};
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Methods"] = "OPTIONS";
    headers["Access-Control-Allow-Headers"] = "*";
    res.writeHead(200, headers);
    res.end();
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");
    next();
  }
});

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use((error, req, res, next) => {
  const { status = 500, message = error } = error || {};

  res.status(status).send(message);
});

module.exports = app;
