const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.autoLogin = async (req, res) => {
  try {
    console.log(req.userInfo.id);
    const user = await User.findById(req.userInfo.id);
    res.status(200).json({ message: "login successfull", response: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// exports.requestOtp = async (req, res) => {
//   if (!req.body.phone)
//     return res.status(400).json({ message: "invalid user data" });

//   try {
//     const otp = crypto.randomInt(1000, 9999);
//     const tte = Date.now() + 1000 * 60 * 5;
//     const hash = crypto
//       .createHmac("sha256", "supersecret")
//       .update(`${req.body.phone}.${otp}.${tte}`)
//       .digest("hex");
//     res.status(200).send({
//       message: "otp sent succesfully",
//       hash: `${hash}.${tte}`,
//       otp: otp,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "internal server error" });
//   }
// };

// exports.login = async (req, res, next) => {
//   if (!req.body.phone || !req.body.otp)
//     return res.status(400).json({ message: "invalid user credentails" });
//   try {
//     const { phone, otp, hash } = req.body;
//     let user = await User.findOne({ phone: req.body.phone });
//     const tte = +hash.split(".").pop();
//     if (tte < Date.now()) {
//       return res.status(400).json({ message: "otp expired" });
//     }
//     const userHash = crypto
//       .createHmac("sha256", "supersecret")
//       .update(`${phone}.${otp}.${tte}`)
//       .digest("hex");
//     if (userHash != hash.split(".").shift()) {
//       return res.status(400).json({ message: "incorrect otp" });
//     }
//     if (!user) {
//       user = await User.create(req.body);
//     }
//     const token = jwt.sign(
//       { phone: user.phone, id: user._id },
//       process.env.JWT_SECRET
//     );
//     res.status(200).json({ message: "login successful", user, token });
//   } catch (err) {
//     console.log(err);
//   }
// };

exports.signup = async (req, res) => {
  if (!req.body.email || !req.body.phone || !req.body.password)
    return res.status(400).json({ message: "Invalid data" });
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const u = { ...req.body, password: hashedPassword };
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const user = await User.create(u);
    res.status(201).json({ message: "user signed up", response: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status({ message: "Invalid data" });
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "User not found" });
    const isSame = await bcrypt.compare(req.body.password, user.password);
    if (!isSame) return res.status(400).json({ message: "Incorrect Password" });
    const token = jwt.sign(
      { id: user._id, admin: user.admin },
      process.env.JWT_SECRET
    );
    res.status(200).json({ message: "login success", user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

////////////////////////////// admin auth

exports.adminLogin = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status({ message: "Invalid data" });
  try {
    const user = await User.findOne({ email: req.body.email, admin: true });
    if (!user) return res.status(400).json({ message: "User not found" });
    const isSame = await bcrypt.compare(req.body.password, user.password);
    if (!isSame) return res.status(400).json({ message: "Incorrect Password" });
    const token = jwt.sign(
      { id: user._id, admin: user.admin },
      process.env.JWT_SECRET
    );
    res.status(200).json({ message: "login success", user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
