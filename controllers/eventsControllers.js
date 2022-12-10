const { db } = require("../db")
const events = require("../database/events")
const { logger, getSession } = require("./utils")

// @RequireAuth
// @Type/View
// @GET/events
exports.showEventsPage = (req, res) => {
    const session = getSession(req)
    db.all(events.getAllByUserId, [session.userId], (err, rows) => {
        logger(err)
        res.render("events/events", { model: rows, ...session })
    })
}

// @RequireAuth
// @Type/View
// @GET/events/create
exports.showEventCreatePage = (req, res) => {
    const session = getSession(req)
    res.render("events/create", { model: {}, ...session })
}

// @RequireAuth
// @Type/Action
// @POST/events/create
exports.createEventAction = (req, res) => {
    const session = getSession(req)
    const event = [
        session.userId,
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
    const id = req.params.id
    db.run(events.deleteById, id, err => {
        logger(err)
        res.redirect("/events")
    })
}

// @Public
// @Type/View
// @GET/events/public/events
exports.showPublicEvents = (req, res) => {
    const session = getSession(req)
    db.all(events.getAll, (err, rows) => {
        logger(err)
        res.render("events/public/events", { model: rows, ...session })
    })
}

// @Public
// @Type/View
// @GET/events/public/event/:id
exports.showPublicEvent = (req, res) => {
    const session = getSession(req)
    const id = req.params.id
    db.get(events.getById, id, (err, event) => {
        logger(err)
        res.render("events/public/event", { event, ...session })
    })
}
