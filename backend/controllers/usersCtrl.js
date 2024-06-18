const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//! User Registration

const usersController = {
    //? user registration
    register: asyncHandler(async (req, res) => {
        try {
            //? get user input
            const { username, email, password } = req.body;

            //? check if user exists
            const user = await User.findOne({ email });

            //? if user exists
            if (user) {
                return res.status(400).json({ message: "User already exists" });
            }

            //? create new user
            const newUser = new User({ username, email, password });

            //? save user to database
            await newUser.save();

            //? return response
            res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },)
    //?login
    //?profile
};

module.exports = usersController;
