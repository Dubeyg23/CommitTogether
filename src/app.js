const express = require("express");

const app = express();

// app.get("/user", (req, res) => {
//     res.send({ firstName: "Gourav", lastName: "Dubey" });
// })
// use of question mark, +, * 
app.get("/ab?c", (req, res) => {
    res.send({ firstName: "Gourav", lastName: "Dubey" });
})
app.get("/user/:userId/:name/:password", (req, res) => {
    console.log(req.params)
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
