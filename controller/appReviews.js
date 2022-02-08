const appReviews = require("../models/AdminReview");

exports.getReviews = async (req, res) => {
  try {
    const reviews = await appReviews.find();
    res
      .status(200)
      .json({ message: "Reviews fetched successfully", response: reviews });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
