const {
    showPostsPage,
    showPostCreatePage,
    createPostAction,
    showEditPostPage,
    editPostAction,
    showDeletePostPage,
    deletePostAction
} = require("../controllers/postsControllers")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/assets/img')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
const upload = multer({ storage: storage })

exports.postRoutes = (app) => {
    app.route("/posts")
        .get(showPostsPage)

    app.route("/posts/create")
        .get(showPostCreatePage)
        // .post(createPostAction)

    app.post("/posts/create", upload.single('img_path'), createPostAction);

    app.route("/posts/edit/:id")
        .get(showEditPostPage)
        .post(editPostAction)

    app.route("/posts/delete/:id")
        .get(showDeletePostPage)
        .post(deletePostAction)
}
