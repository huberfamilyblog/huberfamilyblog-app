const { db } = require("../db")
const events = require("../database/events");

exports.eventRoutes = (app) => {
  app.route("/events")
    // GET /events
    .get((req, res) => {
      // @TODO: pass in real author id when auth is set up
      db.all(events.getAll, ['1'], (err, rows) => {
        if (err) {
          return console.error(err.message);
        }
        res.render("events/events", { model: rows });
      });
    });
  
  app.route("/events/create")
    // GET /create
    .get((req, res) => {
      res.render("events/create", { model: {} });
    })
    // POST /create
    .post((req, res) => {
      const event = [
          // @TODO: use real author id when auth is set up
          // req.body.author_id,
          '1',
          req.body.title,
          req.body.description,
          req.body.event_date,
          req.body.event_time
      ];
      db.run(events.createEvent, event, err => {
        if (err) {
          return console.error(err.message);
        }
        res.redirect("/events");
      });
    });

  app.route("/events/edit/:id")
    // GET /edit/5
    .get((req, res) => {
      const id = req.params.id;
      db.get(events.getById, id, (err, row) => {
        if (err) {
          return console.error(err.message);
        }
        res.render("events/edit", { model: row });
      });
    })  
    // POST /edit/5
    .post((req, res) => {
      const id = req.params.id;
      const event = [
          req.body.title,
          req.body.description,
          req.body.event_date,
          req.body.event_time,
          id
      ];
      db.run(events.updateById, event, err => {
        if (err) {
          return console.error(err.message);
        }
        res.redirect("/events");
      });
    });

  app.route("/events/delete/:id")
    // GET /delete/5
    .get((req, res) => {
      const id = req.params.id;
      db.get(events.getById, id, (err, row) => {
        if (err) {
          return console.error(err.message);
        }
        res.render("events/delete", { model: row });
      });
    })
    // POST /delete/5
    .post((req, res) => {
      const id = req.params.id;
      db.run(events.deleteById, id, err => {
        if (err) {
          return console.error(err.message);
        }
        res.redirect("/events");
      });
    });
}