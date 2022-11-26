const {
    showPostsPage,
    showPostCreatePage,
    createPostAction,
    showEditPostPage,
    editPostAction,
    showDeletePostPage,
    deletePostAction
} = require("../controllers/postsControllers")

exports.postRoutes = (app) => {
    app.route("/posts")
        .get(showPostsPage)

    app.route("/posts/create")
        .get(showPostCreatePage)
        .post(createPostAction)

    app.route("/posts/edit/:id")
        .get(showEditPostPage)
        .post(editPostAction)

    app.route("/posts/delete/:id")
        .get(showDeletePostPage)
        .post(deletePostAction)
}
