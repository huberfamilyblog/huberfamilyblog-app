module.exports = (req, res, next) => {
    console.log(req.session.auth)
    if (!req.session?.auth?.isLoggedIn) {
        return res.redirect("/login")
    }
    next()
}