const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/User");
const app = express();
app.post("/signup", async (req, res) => {
    const userObj = {
        firstName: "Virat",
        lastName: "Kohli",
        emailId: "virat@gmai;.com",
        password: "virat@123"
    }
    // Creating a new instance of the user model
    const user = new User(userObj)
    try {
        await user.save();
        res.send("User Added Successfully!")
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }
})
connectDb().then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
        console.log("Server is successfully listening on the port 3000");
    });
}).catch((err) => {
    console.log("Databse cannot be connected");
});