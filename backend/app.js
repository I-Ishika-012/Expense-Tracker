const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");

app.use(express.json());

//?routes
app.use("/", userRouter);
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use("/api/v1", require("./routes/userRouter"));
// app.use("/api/v1", require("./routes/transactionRouter"));
// app.use("/api/v1", require("./routes/categoryRouter"));
// app.use("/api/v1", require("./routes/authRouter"));

//?start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



