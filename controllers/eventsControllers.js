const { db } = require("../db")
const events = require("../database/events")
const { logger } = require("./utils")

// @GET/events
exports.showEventsPage = (_, res) => {
    // @TODO: pass in real author id when auth is set up
    db.all(events.getAll, ['1'], (err, rows) => {
        logger(err)
        res.render("events/events", { model: rows })
    })
}

// @GET/events/create
exports.showEventCreatePage = (_, res) => {
    res.render("events/create", { model: {} })
}

// @POST/events/create
exports.createEventAction = (req, res) => {
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

// @GET/event/edit/:id
exports.showEditEventPage = (req, res) => {
    const id = req.params.id
    db.get(events.getById, id, (err, row) => {
        logger(err)
        res.render("events/edit", { model: row })
    })
}

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

// @GET/events/delete/:id
exports.showDeleteEventPage = (req, res) => {
    const id = req.params.id
    db.get(events.getById, id, (err, row) => {
        logger(err)
        res.render("events/delete", { model: row })
    })
}

// @POST/events/delete/:id
exports.deleteEventAction = (req, res) => {
    const id = req.params.id
    db.run(events.deleteById, id, err => {
        logger(err)
        res.redirect("/events")
    })
}
