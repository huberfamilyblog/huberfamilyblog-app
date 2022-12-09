const { db } = require('../db')
const users = require('../database/users')
const { logger } = require('./utils')
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid').v4
const saltRounds = 10

exports.sessions = {}

/**
 * Utility middleware to check user session
 * @param {Request} req 
 * @returns number
 */
exports.checkSession = (req) => {
    const sessionId = req.headers.cookie.split('=')[1]
    const userSession = this.sessions[sessionId]
    if (!userSession) {
        return res.status(401).redirect("/login")
    }
    return userSession.userId
}

// @GET/login
exports.showLoginPage = (_, res) => {
    res.render("auth/login", { message: '' })
}

// @POST/login
exports.loginUser = (req, res) => {
    const { username, password } = req.body
    // check for user in database
    db.get(users.getUserByUsername, username, (err, user) => {
        if (err) {
            logger(err)
            res.status(500).render("auth/login", { message: 'Sorry something went wrong.' })
            return
        }
        if (user) {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) logger(err)
                bcrypt.compare(user.password, hash, (err, result) => {
                    if (err) logger(err)
                    if (result) {
                        const sessionId = uuidv4()
                        this.sessions[sessionId] = { username, userId: user.id }
                        res.set('Set-Cookie', `session=${sessionId}`)
                        res.redirect("/")
                        return
                    }
                    res.status(401).render("auth/login", { message: 'No user found with those credentials' })
                    return
                })
            })
        } else {
            res.status(404).render("auth/login", { message: 'No user was found with those credentials' })
        }
    })
}

// @GET/logout
exports.logoutUser = (req, res) => {
    const sessionId = req.headers.cookie.split('=')[1]
    delete this.sessions[sessionId]
    res.redirect("/")
}

// @GET/signup
exports.showSignUpPage = (_, res) => {
    res.render("auth/signup", { message: '' })
}

// @POST/signup
exports.signUp = (req, res) => {
    const { username, password } = req.body
    // Check if user exists already
    db.get(users.getUserByUsername, username, (err, user) => {
        if (err) {
            logger(err)
            res.status(500).render("auth/signup", { message: 'Sorry something went wrong.' })
            return
        }
        if (user) {
            res.status(409).render("auth/signup", { message: 'There appears to already be a user with that username, Please login or create a new account.' })
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
                            const sessionId = uuidv4()
                            this.sessions[sessionId] = { username, userId }
                            res.set('Set-Cookie', `session=${sessionId}`)
                            res.redirect("/", { userId })
                            return
                        })
                    }
                })
            })
        }
    })
}