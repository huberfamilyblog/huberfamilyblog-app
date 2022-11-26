const path = require("path")
const express = require("express")
const { eventRoutes } = require("./routes/eventRoutes")
const { postRoutes } = require("./routes/postRoutes")

// Creating the Express server
const app = express()

// Server configuration and template engine set up
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: false }))

// @GET /
app.get("/", (_, res) => {
    res.render("index");
})

// Routes
eventRoutes(app)
postRoutes(app)

// Starting the server
app.listen(3000, () => {
    console.log("Server running at: http://localhost:3000/")
})