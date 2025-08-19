const adminAuth = (req, res, next) => {
    console.log("admin auth is called again")
    const token = "xyz"
    const isAdminAuthenticated = token === "xyz";
    if (!isAdminAuthenticated) {
        res.status(401).send("not authenticated");
    } else {
        next();
    }
}
module.exports = {
    adminAuth
};