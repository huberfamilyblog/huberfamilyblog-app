const { db } = require('../db')
const users = require('../database/users')
const { logger, getSession } = require('./utils')
const bcrypt = require('bcrypt');
// const uuidv4 = require('uuid').v4
const saltRounds = 10

// exports.sessions = {}

// @Type/View
// @GET/login
exports.showLoginPage = (req, res) => {
    const session = getSession(req)
    res.render("auth/login", { message: '', ...session })
}

// @Type/View
// @GET/signup
exports.showSignUpPage = (req, res) => {
    const session = getSession(req)
    res.render("auth/signup", { message: '', ...session })
}

// @Type/Action
// @POST/login
exports.loginUser = (req, res) => {
    const session = getSession(req)
    const { username, password } = req.body
    // check for user in database
    db.get(users.getUserByUsername, username, (err, user) => {
        if (err) {
            logger(err)
            res.status(500).render("auth/login", { message: 'Sorry something went wrong.', ...session })
            return
        }
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) logger(err)
                if (result) {
                    req.session.auth = {
                        isLoggedIn: true,
                        username,
                        userId: user.id
                    };
                    res.redirect("/")
                    return
                }
                res.status(401).render("auth/login", { message: 'No user found with those credentials', ...session })
                return
            })
        } else {
            res.status(404).render("auth/login", { message: 'No user was found with those credentials', ...session })
        }
    })
}

// @Type/Action
// @GET/logout
exports.logoutUser = (req, res) => {
    req.session.auth = {
        isLoggedIn: false,
        username: null,
        userId: null
    }
    res.redirect("/")
}

// @Type/Action
// @POST/signup
exports.signUp = (req, res) => {
    const session = getSession(req)
    const { username, password } = req.body
    // Check if user exists already
    db.get(users.getUserByUsername, username, (err, user) => {
        if (err) {
            logger(err)
            res.status(500).render("auth/signup", { message: 'Sorry something went wrong.', ...session })
            return
        }
        if (user) {
            res.render("auth/signup", { message: 'There appears to already be a user with that username, Please login or create a new account.', ...session })
        } else {
            // if user doesn't exist, create user and login
            bcrypt.hash(password, saltRounds, (hashErr, hash) => {
                if (hashErr) logger(hashErr)
                db.all(users.createUser, [username, hash], createUserError => {
                    logger(createUserError)
                    if (!createUserError) {
                        db.get(users.getRecentId, [], (getRecentIdError, result) => {
                            logger(getRecentIdError)
                            const userId = result['last_insert_rowid()']
                            req.session.auth = {
                                isLoggedIn: true,
                                username,
                                userId
                            };
                            res.redirect("/")
                            return
                        })
                    }
                })
            })
        }
    })
}