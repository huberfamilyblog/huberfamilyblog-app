const { showLoginPage } = require("../controllers/usersControllers")

exports.authRoutes = (app) => {
    app.route("/login")
        .get(showLoginPage)
}