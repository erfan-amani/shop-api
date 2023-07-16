const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    expireAt: { type: Date, required: true },
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
