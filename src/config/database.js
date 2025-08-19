const mongoose = require("mongoose");
const connectDb = async () => {
    await mongoose.connect("mongodb+srv://gouravdubey142:QE6aaeqkBHLWL4qV@mylearning.vdsbpg3.mongodb.net/CommitTogether")
};

module.exports = connectDb