exports.createTable = `CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);`

exports.getUserByUsername = `SELECT * FROM Users WHERE username = ? LIMIT 1;`

exports.createUser = `INSERT INTO Users (username, password) VALUES (?, ?);`

exports.getRecentId = 'select last_insert_rowid();'
