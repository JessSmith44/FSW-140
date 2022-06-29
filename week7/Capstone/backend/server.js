const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});
const fs = require('fs');
// const path = require('path');
const { db } = require('./database')
// const cloudinary = require('cloudinary')

const app = express();

var connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'password',
  database: 'pictureshare'
})
 
connection.connect()


 

app.listen('4040', () => {
    console.log('Local connection running successfully');
});

app.post('/InsertNewRow', (req, res) => {
  let row1 = {title: req.body.title, description: req.body.description, img: req.body.image}
  let sqlString = 'INSERT INTO posts SET ?'

  connection.query(sqlString, row1, (err, result) =>{
      if (err){
          throw err;
      }
      console.log(result)
      res.send('Row added successfully!')
  })
});

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

app.get('/GetPosts', (req, res) => {
  let sqlString = 'SELECT * FROM posts'

  connection.query(sqlString, (err, result) => {
      if (err){
          throw err;
      }
      console.log(result)
      res.send(result)
  })
});

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

app.get('/GetPosts/:id', (req, res) => {
  let sqlString = `SELECT * FROM posts WHERE id = ${req.params.id}`

  connection.query(sqlString, (err, result) => {
      if (err){
          throw err;
      }
      console.log(result)
      res.send("Item selected successfully!")
  })
});

app.put('/UpdatePosts/:id', (req, res) => {
  let newTitle = ''
  let sqlString = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`

  connection.query(sqlString, (err, result) => {
      if (err){
          throw err;
      }
      console.log(result)
      res.send("Item updated successfully!")
  })
});

app.delete('/DeletePosts/:id', (req, res) => {
  let newTitle = ''
  let sqlString = `DELETE FROM posts WHERE id = ${req.params.id}`

  connection.query(sqlString, (err, result) => {
      if (err){
          throw err;
      }
      console.log(result)
      res.send("Item deleted successfully!")
  })
});

// cloudinary.config({ 
//   cloud_name: 'dwthknilv', 
//   api_key: '152475144188182',
//   api_secret: 'wWpVjMDJj93lrLqjJGXX-AgfE_Q' 
// });

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

exports.getPosts = getPosts
exports.createPost = createPost