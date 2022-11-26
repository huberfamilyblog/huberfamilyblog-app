const path = require("path")
const sqlite3 = require("sqlite3").verbose()
const events = require("./database/events")
const posts = require("./database/posts")

// Connection to the SQlite database
const db_name = path.join(__dirname, "data", "database.db")
const db = new sqlite3.Database(db_name, err => {
    if (err) return console.error(err.message)
    console.log("DB connection successful!")
})

const initTables = () => {
    // Create Events Table
    db.run(events.createTable, err => {
        if (err) return console.error(err.message)
        console.log("'Events' table init complete")
    })

    // Create Posts Table
    db.run(posts.createTable, err => {
        if (err) return console.error(err.message)
        console.log("'Posts' table init complete")
    })
}

const seedTables = () => {
    // Seeder Events
    db.run(events.seed, err => {
        if (err) return console.error(err.message)
        console.log("Successful creation of 3 events")
    })

    // Seeder Posts
    db.run(posts.seed, err => {
        if (err) return console.error(err.message)
        console.log("Successful creation of 3 posts")
    })
}

module.exports = {
    db,
    initTables,
    seedTables
}
