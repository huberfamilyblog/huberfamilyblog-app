const { db } = require("../db")
const posts = require("../database/posts")
const { logger } = require("./utils")

// @GET/posts
exports.showPostsPage = (_, res) => {
    // @TODO: pass in real author id when auth is set up
    db.all(posts.getAllByAuthor, ['1'], (err, rows) => {
        logger(err)
        res.render("posts/posts", { model: rows })
    })
}

// @GET/posts/create
exports.showPostCreatePage = (_, res) => {
    res.render("posts/create", { model: {} })
}

// @POST/posts/create
exports.createPostAction = (req, res) => {
    const event = [
        // @TODO: use real author id when auth is set up
        // req.body.author_id,
        '1',
        req.body.title,
        req.body.content,
        req.body.status,
        req.body.img_path,
    ]
    db.run(posts.createPost, event, err => {
        logger(err)
        res.redirect("/posts")
    })
}

// @GET/event/edit/:id
exports.showEditPostPage = (req, res) => {
    const id = req.params.id
    db.get(posts.getById, id, (err, row) => {
        logger(err)
        res.render("posts/edit", { model: row })
    })
}

// @POST/event/edit/:id
exports.editPostAction = (req, res) => {
    const id = req.params.id
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

// @GET/posts/delete/:id
exports.showDeletePostPage = (req, res) => {
    const id = req.params.id
    db.get(posts.getById, id, (err, row) => {
        logger(err)
        res.render("posts/delete", { model: row })
    })
}

// @POST/posts/delete/:id
exports.deletePostAction = (req, res) => {
    const id = req.params.id
    db.run(posts.deleteById, id, err => {
        logger(err)
        res.redirect("/posts")
    })
}

// Public Routes
// @GET/posts/public/posts
exports.showPublicPosts = (_, res) => {
    db.all(posts.getAll, (err, rows) => {
        logger(err)
        res.render("posts/public/posts", { model: rows })
    })
}

// @GET/posts/public/post/:id
exports.showPublicPost = (req, res) => {
    const id = req.params.id
    db.get(posts.getById, id, (err, post) => {
        logger(err)
        res.render("posts/public/post", { post })
    })
}
