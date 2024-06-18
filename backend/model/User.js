const mongoose = require("mongoose");

//! user schema
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        },
    },
    //? property for time stamps in mongoose - created at and updated at
    { timestamps: true }
);

//! export model
module.exports = mongoose.model("User", userSchema);
