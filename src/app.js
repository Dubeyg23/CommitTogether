const express = require("express");
const connectDb = require("./config/database")
const app = express()
connectDb().then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
        console.log("Server is successfully listening on the port 3000");
    });
}).catch((err) => {
    console.log("Databse cannot be connected");
});