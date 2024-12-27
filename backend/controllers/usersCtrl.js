const asyncHandler = require("express-async-handler");
const User = require("../model/User");

//! User Registration

const usersController = {
    //! User Registration
    register: asyncHandler(async (req, res) => {
        //?get payload/data from request body
        const { username, email, password } = req.body;
        res.json({ msg: "register" });
    }),
    //! Login User
    //! Get User Profile
};

module.exports = usersController;
