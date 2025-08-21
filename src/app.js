const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/User");
const app = express();
app.use(express.json());
app.post("/signup", async (req, res) => {
    const userObj = req.body
    // Creating a new instance of the user model
    const user = new User(userObj)
    try {
        await user.save();
        res.send("User Added Successfully!")
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }
});
//read API to get all user data
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const user = await User.findOne({ emailId: userEmail })
        if (!user) {
            res.status(404).send("User not found");
        } else {
            res.send(user);
        }

        // const user = await User.find({ emailId: userEmail })
        // if (user.length === 0) {
        //     res.status(404).send("User not found");
        // } else {
        //     res.send(user);
        // }

    } catch (err) {
        res.status(400).send("Something went wrong");
    }
})
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (err) {
        res.status(404).send("Something went wrong");
    }
});
connectDb().then(() => {
    console.log("Datab'ase connection established");
    app.listen(3000, () => {
        console.log("Server is successfully listening on the port 3000");
    });
}).catch((err) => {
    console.log("Databse cannot be connected");
});