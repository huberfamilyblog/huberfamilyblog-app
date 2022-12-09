const isAuth = require("../middleware/isAuth")
const {
    showEventsPage,
    showEventCreatePage,
    createEventAction,
    showEditEventPage,
    editEventAction,
    showDeleteEventPage,
    deleteEventAction
} = require("../controllers/eventsControllers")
const {
    showPostsPage,
    showPostCreatePage,
    createPostAction,
    showEditPostPage,
    editPostAction,
    showDeletePostPage,
    deletePostAction
} = require("../controllers/postsController")
const { logoutUser } = require("../controllers/usersControllers")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/assets/img')
    },
    filename: function (req, file, cb) {
        console.log({ file })
        cb(null, `${Date.now()}--${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

exports.privateRoutes = (app) => {
    // Events Routes
    app.route("/events")
        .get(isAuth, showEventsPage)

    app.route("/events/create")
        .get(isAuth, showEventCreatePage)
        .post(isAuth, createEventAction)

    app.route("/events/edit/:id")
        .get(isAuth, showEditEventPage)
        .post(isAuth, editEventAction)

    app.route("/events/delete/:id")
        .get(isAuth, showDeleteEventPage)
        .post(isAuth, deleteEventAction)

    // Posts Routes
    app.route("/posts")
        .get(isAuth, showPostsPage)

    app.route("/posts/create")
        .get(isAuth, showPostCreatePage)
        // .post(isAuth, createPostAction)

    app.post("/posts/create", isAuth, upload.single('img_path'), createPostAction);

    app.route("/posts/edit/:id")
        .get(isAuth, showEditPostPage)
        .post(isAuth, editPostAction)

    app.route("/posts/delete/:id")
        .get(isAuth, showDeletePostPage)
        .post(isAuth, deletePostAction)

    // Auth Routes
    app.route("/logout")
        .get(isAuth, logoutUser)   
}