const { db } = require("../db")
const events = require("../database/events")
const { logger, getSession } = require("./utils")

// @RequireAuth
// @Type/View
// @GET/events
exports.showEventsPage = (req, res) => {
    const session = getSession(req)
    db.all(events.getAll, [session.userId], (err, rows) => {
        logger(err)
        res.render("events/events", { model: rows, ...session })
    })
}

// @RequireAuth
// @Type/View
// @GET/events/create
exports.showEventCreatePage = (_, res) => {
    const session = getSession(req)
    res.render("events/create", { model: {}, ...session })
}

// @RequireAuth
// @Type/Action
// @POST/events/create
exports.createEventAction = (req, res) => {
    const session = getSession(req)
    const event = [
        // @TODO: use real author id when auth is set up
        // req.body.author_id,
        '1',
        req.body.title,
        req.body.description,
        req.body.event_date,
        req.body.event_time
    ]
    db.run(events.createEvent, event, err => {
        logger(err)
        res.redirect("/events")
    })
}

// @RequireAuth
// @Type/View
// @GET/event/edit/:id
exports.showEditEventPage = (req, res) => {
    const session = getSession(req)
    const id = req.params.id
    db.get(events.getById, id, (err, row) => {
        logger(err)
        res.render("events/edit", { model: row, ...session })
    })
}

// @RequireAuth
// @Type/Action
// @POST/event/edit/:id
exports.editEventAction = (req, res) => {
    const session = getSession(req)
    const id = req.params.id
    const event = [
        req.body.title,
        req.body.description,
        req.body.event_date,
        req.body.event_time,
        id
    ]
    db.run(events.updateById, event, err => {
        logger(err)
        res.redirect("/events")
    })
}

// @RequireAuth
// @Type/View
// @GET/events/delete/:id
exports.showDeleteEventPage = (req, res) => {
    const session = getSession(req)
    const id = req.params.id
    db.get(events.getById, id, (err, row) => {
        logger(err)
        res.render("events/delete", { model: row, ...session })
    })
}

// @RequireAuth
// @Type/Action
// @POST/events/delete/:id
exports.deleteEventAction = (req, res) => {
    const session = getSession(req)
    const id = req.params.id
    db.run(events.deleteById, id, err => {
        logger(err)
        res.redirect("/events")
    })
}
