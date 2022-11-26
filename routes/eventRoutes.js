const {
    showEventsPage,
    showEventCreatePage,
    createEventAction,
    showEditEventPage,
    editEventAction,
    showDeleteEventPage,
    deleteEventAction
} = require("../controllers/eventsControllers")

exports.eventRoutes = (app) => {
    app.route("/events")
        .get(showEventsPage)

    app.route("/events/create")
        .get(showEventCreatePage)
        .post(createEventAction)

    app.route("/events/edit/:id")
        .get(showEditEventPage)
        .post(editEventAction)

    app.route("/events/delete/:id")
        .get(showDeleteEventPage)
        .post(deleteEventAction)
}
