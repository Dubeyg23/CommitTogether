const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/User");
const app = express();
app.use(express.json());
app.post("/signup", async (req, res) => {
    const userObj = req.body
    // Creating a new instance of the user model
    const user = new User(userObj);
    try {
        await user.save();
        res.send("User Added Successfully!");
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }
});
//read API to get all user data
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const user = await User.findOne({ emailId: userEmail });
        if (!user) {
            res.status(404).send("User not found");
        } else {
            res.send(user);
        }

        // const user = await User.find({ emailId: userEmail });
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
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(404).send("Something went wrong");
    }
});

app.delete("/delete", async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted sucessfully");
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

app.patch("/updateUser:userId", async (req, res) => {
    const userId = req.params.userId;
    const data = req.body;

    try {
        const allowUpdates = [
            "userId", "photoUrl", "about", "gender", "age", "skills"
        ];
        const isUpdateAllowed = Object.keys(data).every((k) =>
            allowUpdates.includes(k)
        );
        if (!isUpdateAllowed) {
            throw new Error("Update not allowed");
        };
        if (data.skills.length > 10) {
            throw new Error("Skills can not be more than 10");
        }
        const user = await User.findByIdAndUpdate({ _id: userId }, data, {
            returnDocument: "after",
            runValidators: true
        });
        res.send("User updated sucessfully");
    } catch (err) {
        res.status(400).send("Update failed:" + err.message);
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