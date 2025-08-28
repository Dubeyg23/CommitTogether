const express = require("express");
const User = require("../models/User");
const { userAuth } = require("../middlewares/auth");
const profileRouter = express.Router();
profileRouter.get("/profile", userAuth, (req, res) => {
    try {
        const user = req.user
        if (!user) {
            throw new Error("User not found");
        }
        res.send(user);
    } catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }
});

module.exports = profileRouter;