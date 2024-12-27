const express = require("express");

const usersController = require("../controllers/usersCtrl");

const userRouter = express.Router();

const isAuthenticated = require("../middlewares/isAuth");

//! Register User
userRouter.post("/api/v1/users/register", usersController.register);

//! Login User
userRouter.post("/api/v1/users/login", usersController.login);

//! Get User Profile
userRouter.get("/api/v1/users/profile", isAuthenticated, usersController.profile);

module.exports = userRouter;
