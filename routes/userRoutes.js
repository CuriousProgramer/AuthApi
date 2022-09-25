const express = require("express");
const UserController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/signup", UserController.signUp);

userRouter.post("/login", UserController.login);
userRouter.post("/protect", UserController.protect);

module.exports = userRouter;
