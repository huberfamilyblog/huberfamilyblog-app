const { db } = require("../db")
const posts = require("../database/posts")
const { logger, getSession } = require("./utils")

// @RequireAuth
// @Type/View
// @GET/posts
exports.showPostsPage = (req, res) => {
    const session = getSession(req)
    db.all(posts.getAllByAuthor, [session.userId], (err, rows) => {
        logger(err)
        res.render("posts/posts", { model: rows, ...session })
    })
}

// @RequireAuth
// @Type/View
// @GET/posts/create
exports.showPostCreatePage = (req, res) => {
    const session = getSession(req)
    res.render("posts/create", { model: {}, ...session })
}

// @RequireAuth
// @Type/Action
// @POST/posts/create
exports.createPostAction = (req, res) => {
    const session = getSession(req)
    const event = [
        session.userId,
        req.body.title,
        req.body.content,
        req.body.status,
        req.file.path,
    ]
    db.run(posts.createPost, event, err => {
        logger(err)
        res.redirect("/posts")
    })
}

// @RequireAuth
// @Type/View
// @GET/event/edit/:id
exports.showEditPostPage = (req, res) => {
    const session = getSession(req)
    const id = req.params.id
    db.get(posts.getById, id, (err, row) => {
        logger(err)
        res.render("posts/edit", { model: row, ...session })
    })
}

// @RequireAuth
// @Type/Action
// @POST/event/edit/:id
exports.editPostAction = (req, res) => {
    const id = req.params.id
    // @BUG: for some reason the body is coming back empty
    console.log({ body: req.body })
    const event = [
        req.body.title,
        req.body.content,
        req.body.status,
        req.body.img_path,
        id
    ]
    db.run(posts.updateById, event, err => {
        logger(err)
        res.redirect("/posts")
    })
}

// @RequireAuth
// @Type/View
// @GET/posts/delete/:id
exports.showDeletePostPage = (req, res) => {
    const session = getSession(req)
    const id = req.params.id
    db.get(posts.getById, id, (err, row) => {
        logger(err)
        res.render("posts/delete", { model: row, ...session })
    })
}

// @RequireAuth
// @Type/Action
// @POST/posts/delete/:id
exports.deletePostAction = (req, res) => {
    const id = req.params.id
    db.run(posts.deleteById, id, err => {
        logger(err)
        res.redirect("/posts")
    })
}

// @Public
// @Type/View
// @GET/posts/public/posts
exports.showPublicPosts = (req, res) => {
    const session = getSession(req)
    db.all(posts.getAll, (err, rows) => {
        logger(err)
        res.render("posts/public/posts", { model: rows, ...session })
    })
}

// @Public
// @Type/View
// @GET/posts/public/post/:id
exports.showPublicPost = (req, res) => {
    const session = getSession(req)
    const id = req.params.id
    db.get(posts.getById, id, (err, post) => {
        logger(err)
        res.render("posts/public/post", { post, ...session })
    })
}
