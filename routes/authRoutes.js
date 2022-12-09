const {
    showLoginPage,
    showSignUpPage,
    loginUser,
    logoutUser,
    signUp
} = require("../controllers/usersControllers")

exports.authRoutes = (app) => {
    app.route("/login")
        .get(showLoginPage)
        .post(loginUser)
    app.route("/logout")
        .get(logoutUser)
    app.route("/signup")
        .get(showSignUpPage)
        .post(signUp)
}