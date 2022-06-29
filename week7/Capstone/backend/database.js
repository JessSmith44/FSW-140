const mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'password',
  database: 'pictureshare'
})
 
connection.connect()

function createPost(title, description, image_url, callback) {

  const query = `
  INSERT INTO posts (title, description, image_url)
  VALUES (?, ?)
  `

  const params = [title, description, image_url]

  connection.query(query, params, (error, result) => {
    if (error) {
      callback(error)
      return
    }
    callback(null, result.insertId)
  })
}
exports.createPost = createPost

function getPosts(callback) {
  const query = `
  SELECT * FROM posts
  `

  connection.query(query, (error, results) => {
    if (error) {
      callback(error)
      return
    }
    callback(null, results)
  })
}
exports.getPosts = getPosts
 