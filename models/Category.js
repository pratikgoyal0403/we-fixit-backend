const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    locations: [
      {
        type: String,
        //define enum here
        enum: ["Muzaffarpur", "Darbhanga", "Sitamarhi"],
        required: true,
      },
    ],
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "service",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("category", CategorySchema);
