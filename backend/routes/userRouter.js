const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersCtrl");

router.post("/api/v1/register", usersController.register);
router.post("/api/v1/login", usersController.login);

module.exports = router;
