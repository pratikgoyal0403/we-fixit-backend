const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  features: [
    {
      type: String,
      required: true,
    },
  ],
  image: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      review: {
        type: String,
      },
      rating: {
        type: Number,
      },
    },
  ],
  rating: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("service", ServiceSchema);
