const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "User must have an email"],
    validate: [validator.isEmail, "Please provide valid email"],
  },
  password: {
    type: String,
    required: [true, "User must provide password"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "User must provide password confirm"],
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  console.log(this.password);
});

userSchema.methods.checkPassword = async function (candPass, orgPass) {
  return await bcrypt.compare(candPass, orgPass);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
