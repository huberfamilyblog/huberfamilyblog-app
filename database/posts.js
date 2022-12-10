exports.createTable = `CREATE TABLE IF NOT EXISTS Posts (
    post_id INTEGER PRIMARY KEY AUTOINCREMENT,
    author_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    img_path TEXT,
    status TEXT CHECK( status IN ('Published','Draft') ) NOT NULL DEFAULT 'Draft'
  );`
  
const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

exports.seed = `INSERT INTO Posts (post_id, author_id, title, content, status, img_path) VALUES
    (1, 1, 'Todays Musings', '${content}', 'Published', '/public/assets/img/image.jpg'),
    (2, 1, 'My Poor Dead Grass', '${content}', 'Draft', '/public/assets/img/image.jpg'),
    (3, 1, 'Coffee Is My Life Blood', '${content}', 'Published', '/public/assets/img/image.jpg');`
  
exports.getAllByAuthor = `SELECT * FROM Posts WHERE author_id = ?;`

exports.getAll = "SELECT * FROM Posts WHERE status = 'Published';"
  
exports.createPost = `INSERT INTO Posts (author_id, title, content, status, img_path) VALUES (?, ?, ?, ?, ?);`
  
exports.getById = "SELECT * FROM Posts WHERE post_id = ?;"
  
exports.updateById = "UPDATE Posts SET title = ?, content = ?, status = ?, img_path = ? WHERE (post_id = ?);"
  
exports.deleteById = "DELETE FROM Posts WHERE post_id = ?;"
