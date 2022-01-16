const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  admin: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  address: {
    type: String,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orders",
    },
  ],
});

module.exports = mongoose.model("user", UserSchema);
