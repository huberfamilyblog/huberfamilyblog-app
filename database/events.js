exports.createTable = `CREATE TABLE IF NOT EXISTS Events (
  event_id INTEGER PRIMARY KEY AUTOINCREMENT,
  author_id INTEGER NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  event_date VARCHAR(100) NOT NULL,
  event_time VARCHAR(100) NOT NULL
);`

exports.seed = `INSERT INTO Events (event_id, author_id, title, description, event_date, event_time) VALUES
  (1, 1, 'Family BBQ', 'Bring your own sides', 'January 10, 2023', '5:00 PM'),
  (2, 1, 'Dance Show', 'Be there 30 min early', 'May 6, 2023', '6:00 PM'),
  (3, 1, 'Moms Bday', 'Bring a present', 'April 11, 2023', '4:00 PM');`

exports.getAll = `SELECT * FROM Events WHERE author_id = ?;`

exports.createEvent = `INSERT INTO Events (author_id, title, description, event_date, event_time) VALUES (?, ?, ?, ?, ?);`

exports.getById = "SELECT * FROM Events WHERE event_id = ?;"

exports.updateById = "UPDATE Events SET title = ?, description = ?, event_date = ?, event_time = ? WHERE (event_id = ?);"

exports.deleteById = "DELETE FROM Events WHERE event_id = ?;"