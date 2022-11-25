const path = require("path")
const express = require("express")
const { initTables } = require("./db")
const { eventRoutes } = require("./routes/eventRoutes")

// Creating the Express server
const app = express()

// Server configuration and template engine set up
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: false }))

// Create DB Tables
initTables()

// GET /
app.get("/", (req, res) => {
    res.render("index");
})

// Routes
eventRoutes(app)

// Starting the server
app.listen(3000, () => {
    console.log("Server running at: http://localhost:3000/")
})