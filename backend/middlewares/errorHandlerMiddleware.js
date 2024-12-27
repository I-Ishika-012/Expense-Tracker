const { stack } = require("../routes/userRouter");

const errorHandler = (err, req, res, next) => {
    res.json({ 
    message: err.message,
    stack: err.stack
     });
}

module.exports = errorHandler;