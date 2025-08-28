const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLenth: 4
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        // validate(value) {
        //     if (validator.isEmail(value)) {
        //         throw new Error("Invalid email address");
        //     }
        // }
    },
    password: {
        type: String,
        // validate(value) {
        //     if (validator.isStrongPassword(value)) {
        //         throw new Error("Enter a strong password");
        //     }
        // },
        required: true
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        // validate(value) {
        //     if (!["male", "female", "other"].includes(value)) {
        //         throw new Error("Gender data is not valid")
        //     }
        // }
    },
    photoUrl: {
        type: String,
        // validate(value) {
        //     if (validator.isURL(value)) {
        //         throw new Error("Invalid photo url");
        //     }
        // },
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Ddummy&psig=AOvVaw1lixDbm06yRND6u-FrMnOl&ust=1755937813251000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIDP1Z-Ano8DFQAAAAAdAAAAABAE"
    },
    about: {
        type: String,
        default: "This is a default value of the user!"
    },
    skills: {
        type: [String]
    }
}, {
    timestamps: true
});
userSchema.methods.getJWT = function () {
    // const user = this;
    return jwt.sign({ _id: this._id }, "DEV@Tinder$790", {
        expiresIn: "1d"
    });

};

module.exports = mongoose.model("User", userSchema);