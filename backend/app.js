const express = require("express");
const app = express(); //?instance of express
const userRouter = require("./routes/userRouter");
const { default: mongoose } = require("mongoose");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");s




//?connect to database
mongoose.connect("mongodb+srv://<mongouser>:<password>@cluster0.2ei7c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,   
}).then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log(err);
});

//?middleware
//!pass json data
app.use(express.json());

//?routes -- middleware
app.use("/", userRouter);
app.use("/", categoryRouter);

//! error handling middleware
app.use(errorHandler);

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use("/api/v1", require("./routes/userRouter"));
// app.use("/api/v1", require("./routes/transactionRouter"));
// app.use("/api/v1", require("./routes/categoryRouter"));
// app.use("/api/v1", require("./routes/authRouter"));

//?start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



