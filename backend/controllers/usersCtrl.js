const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    login: asyncHandler(async (req, res) => {
        //?get user data from request body
        const { email, password } = req.body;
        //! correct email
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid Login Credentials");
        }
        //! correct password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new Error("Invalid Login Credentials");
        }
        //! Generate Token
        const token = jwt.sign({ id: user._id }, "rararasputin", {
            expiresIn: "10d",
        });
        //! Send Response
        res.send({
            message : "Login Successful",
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    }),
    //! Get User Profile
    profile: asyncHandler(async (req, res) => {
        //! find user by id
        const user = await User.findById(req.user.id);
        if (!user) {
            throw new Error("User not found");
        }
        //! Send Response
        res.json({
            username: user.username,
            email: user.email,
        });
    }),
    //! Change Password
    changePassword: asyncHandler(async (req, res) => {
        //?get password from request body
        const { oldPassword, newPassword } = req.body;
        //! find user by id
        const user = await User.findById(req.user);
        if (!user) {
            throw new Error("User not found");
        }
        //! correct password
        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordCorrect) {
            throw new Error("Invalid Password");
        }
        //! Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        //! Update Password
        user.password = hashedPassword;
        //! Save User ie user password
        await user.save();
        //! Send Response
        res.json({
            message: "Password changed successfully",
        });
    }),
    //! Update User Profile
    updateUserProfile: asyncHandler(async (req, res) => {
        //?get user data from request body
        const { username, email } = req.body;
        //! find user by id
        const updatedUser = await User.findByIdAndUpdate(
            req.user, 
            { username, email },
            { new: true });
        //! Send Response
        res.json({
            message: "Profile updated successfully", updatedUser
        });
    }),
};

module.exports = usersController;
