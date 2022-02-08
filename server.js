require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");

const userRoute = require("./routes/user");
const serviceRoute = require("./routes/services");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const adminRoute = require("./routes/admin");
const appReviews = require("./routes/appReviews");

const app = express();

const storage = multer.diskStorage({
  destination: path.join(__dirname, "images"),
  filename: (req, file, cb) => {
    console.log(file);
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
function sanitizeFile(file, cb) {
  // Define the allowed extension
  let fileExts = [".png", ".jpg", ".jpeg"];
  // Check allowed extensions
  let isAllowedExt = fileExts.includes(
    path.extname(file.originalname.toLowerCase())
  );

  // Mime type must be an image
  let isAllowedMimeType = file.mimetype.startsWith("image/");
  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true); // no errors
  } else {
    // pass error msg to callback, which can be displaye in frontend
    cb("Error: File type not allowed!");
  }
}

//database connection
// require("./config/db"); // setup here

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "images")));

app.use(cors());
app.use(express.static("./public"));

app.use(
  multer({
    storage,
    fileFilter: (req, file, cb) => {
      sanitizeFile(file, cb);
    },
  }).single("image")
);
app.use(serviceRoute);
app.use(cartRoute);
app.use(orderRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use(appReviews);

const port = process.env.PORT;

// mongoose.connect("localhost:27017/we-fixit", () => {
//   app.listen(port, () => console.log(`listening on port: ${port}`));
// });

app.listen(port, () => {
  const dbUri =
    process.env.NODE_ENV === "production"
      ? process.env.DB_URI_PROD
      : process.env.DB_URI_DEV;

  console.log({ dbUri });
  mongoose.connect(dbUri, () => {
    console.log("server is up and running at port: " + port);
  });
});
