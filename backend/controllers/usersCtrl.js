const asyncHandler = require("express-async-handler");
const User = require("../model/User");

//! User Registration

const usersController = {
    //! User Registration
    register: asyncHandler(async (req, res) => {
        res.json({ msg: "register" });
    }),
    //! Login User
    //! Get User Profile
};

module.exports = usersController;
