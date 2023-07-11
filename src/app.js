const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((error, req, res, next) => {
  const { status = 500, message = error } = error || {};

  res.status(status).send(message);
});

module.exports = app;
