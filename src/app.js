const express = require("express");

const app = express();

app.get("/user", (req, res) => {
    res.send({ firstName: "Gourav", lastName: "Dubey" });
})
app.use("/user", (req, res, next) => {
    // route handler 1
    console.log("user 1");
    res.send("Response 1");
    next()
}, (req, res) => {
    // route handler 1
    console.log("user 2");
    res.send("Response 2");
})
// use of question mark, +, * 
app.get("/ab?c", (req, res) => {
    res.send({ firstName: "Gourav", lastName: "Dubey" });
})
app.get("/user/:userId/:name/:password", (req, res) => {
    console.log(req.params);
    res.send({ firstName: "Gourav", lastName: "Dubey" });
})
app.post("/user", (req, res) => {
    console.log("Save data to the database ");
    res.send("Data is successfully saved to the database")
});

app.use("/test", (req, res) => {
    res.send("Testing !");
});

app.listen(3000, () => {
    console.log("Server is successfully listening on the port 3000");
});
