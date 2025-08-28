const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/Validation");
const authRouter = express.Router();
// Signup API
authRouter.post("/signup", async (req, res) => {
    try {
        // Validation of data
        validateSignUpData(req);
        const { firstName, lastName, emailId, password } = req.body
        // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);
        // Creating a new instance of the user model
        const user = new User(
            {
                firstName,
                lastName,
                emailId,
                password: passwordHash
            }
        );
        await user.save();
        res.send("User Added Successfully!");
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

// Login API
authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            // create a JWT token 
            const token = await user.getJWT();
            // Add the token to cookie and send the response back to the user
            res.cookie("token", token);
            res.send("Login Successfull...!!!");
        } else {
            throw new Error("Invalid Credentials");
        }
    } catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }
})
module.exports = authRouter;