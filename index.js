const path = require("path")
const express = require("express")
const session = require("express-session")
const { privateRoutes } = require("./routes/privateRoutes")
const { publicRoutes } = require("./routes/publicRoutes")

// Creating the Express server
const app = express()

// Server configuration and template engine set up
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use("/public", express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: false }))
app.use(session({ secret: 'j94i%29#g48h2g=i24hng2%ui9hg2iu_hg-vn2i39f8g2h3g', resave: false, saveUninitialized: false }))

// Routes
privateRoutes(app)
publicRoutes(app)

// Starting the server
app.listen(3000, () => {
    console.log("Server running at: http://localhost:3000/")
})