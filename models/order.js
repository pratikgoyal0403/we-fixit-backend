const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "services",
        required: true,
      },
    ],
    grandTotal: {
      type: Number,
      required: true,
    },
    remarks: {
      type: String,
    },
    timestamp: {
      type: String,
      enum: ["Morning", "Noon", "Evening"],
    },
    status: {
      type: String,
      enum: ["Placed", "Confirmed", "Completed"],
      default: "Placed",
    },
    bookingDate: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", OrderSchema);
