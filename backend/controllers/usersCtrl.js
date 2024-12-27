const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const bcrypt = require("bcryptjs");

//! User Registration

const usersController = {
    //! Register User
    register: asyncHandler(async (req, res) => {
        //?get payload/data from request body
        const { username, email, password } = req.body;
    //! Validate User
    if (!username || !email || !password) {
        throw new Error("Please fill in all fields");
    }
    //! Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error("User already exists");
    }
    //! Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //! Create & Save User
    const userCreated = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    //! Send Response
    res.status(201).json({
        _id: userCreated._id,
        username: userCreated.username,
        email: userCreated.email,
    });
    }),
    //! Login User
    //! Get User Profile
};

module.exports = usersController;
