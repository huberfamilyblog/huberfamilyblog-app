const {
    showPublicPosts,
    showPublicPost
} = require("../controllers/postsController")
const {
    showLoginPage,
    showSignUpPage,
    loginUser,
    signUp
} = require("../controllers/usersControllers")
const { getSession } = require("../controllers/utils")

exports.publicRoutes = (app) => {
    // @GET/
    app.get("/", (req, res) => {
        const session = getSession(req)
        res.render("index", { ...session });
    })

    // Events Routes

    // Posts Routes
    app.route("/posts/public/posts")
        .get(showPublicPosts)

    app.route("/posts/public/post/:id")
        .get(showPublicPost)

    // Auth Routes
    app.route("/login")
        .get(showLoginPage)
        .post(loginUser)

    app.route("/signup")
        .get(showSignUpPage)
        .post(signUp)
}