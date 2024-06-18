const express = require("express");
const userRouter = express.Router();
const usersController = require("../controllers/usersCtrl");



userRouter.post("/api/v1/register", usersController.register);
// userRouter.post("/api/v1/login", usersController.login);

module.exports = userRouter;
