const express = require("express");
const connectDb = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());
const authRouter = require("./routes/Auth");
const profileRouter = require("./routes/Profile");
const requestRouter = require("./routes/Request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
connectDb().then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
        console.log("Server is successfully listening on the port 3000");
    });
}).catch((err) => {
    console.log("Databse cannot be connected");
});