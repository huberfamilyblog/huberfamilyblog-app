module.exports = (req, res, next) => {
    if (!req.session?.auth?.isLoggedIn) {
        return res.redirect("/login")
    }
    next()
}