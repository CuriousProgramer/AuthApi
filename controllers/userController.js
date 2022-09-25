const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "Failed to Signup",
      err: err,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const user = await User.findOne({ email: req.body.email });
    let token;

    if (await user.checkPassword(password, user.password)) {
      token = jwt.sign({ user }, process.env.JWT_SECRET);
    }
    res.status(200).json({
      status: "success",
      token: token,
      data: user,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  try {
    const loggedIn = await jwt.verify(token, process.env.JWT_SECRET);
    const data = await jwt.decode(token);
    console.log(data);

    res.status(200).json({
      status: "success",
      loggedIn,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
    });
  }
};
