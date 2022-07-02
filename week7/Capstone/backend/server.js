const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});
const fs = require('fs');
// const path = require('path');
const { db } = require('./database');
var bodyParser = require('body-parser');
// const cloudinary = require('cloudinary')
//const sqlRoutes = require('./routes/sqlRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(bodyParser.json())
//app.use('/sqlRoutes', sqlRoutes)

var connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'password',
  database: 'pictureshare'
  
})
connection.connect((err) => {
  if (err){
    throw err;
  }
  console.log('DB connected')
}) 

app.get('/GetPosts', (req, res) => {
  let sqlString = 'SELECT * FROM posts'

  connection.query(sqlString, (err, result) => {
      console.log(connection, 'connection')
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
  let sqlString = `SELECT * FROM posts WHERE PostID = ${req.params.id}`

  connection.query(sqlString, (err, result) => {
      if (err){
          throw err;
      }
      console.log(result)
      res.send("Item selected successfully!")
  })
});


app.post('/InsertNewRow', (req, res) => {
  console.log(req.body)
  let row = { 
    Title: req.body.Title, 
    Description: req.body.Description, 
    ImgURL: req.body.ImgURL
  }
  let sqlString = 'INSERT INTO posts SET ?'
  //console.log(req.body, 'hello')

  connection.query(sqlString, row, (err, result) =>{
      if (err){
          throw err;
      }
      console.log(result)
      res.send('Row added successfully!')
  })
});

function createPost(Title, Description, ImgURL, callback) {

  const query = `
  INSERT INTO posts (Title, Description, ImgURL)
  VALUES (${params})
  `

  const params = [Title, Description, ImgURL]

  connection.query(query, params, (error, result) => {
    if (error) {
      callback(error)
      return
    }
    callback(null, result.insertId)
  })
}

app.put('/UpdatePosts/:id', (req, res) => {
  let newTitle = ''
  let sqlString = `UPDATE posts SET title = '${newTitle}' WHERE PostID = ${req.params.id}`

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
  let sqlString = `DELETE FROM posts WHERE PostID = ${req.params.id}`

  connection.query(sqlString, (err, result) => {
      if (err){
          throw err;
      }
      console.log(result)
      res.send("Item deleted successfully!")
  })
});

// app.listen('4040', () => {
//     console.log('Local connection running successfully');
// });

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

// cloudinary.config({ 
//   cloud_name: 'dwthknilv', 
//   api_key: '152475144188182',
//   api_secret: 'wWpVjMDJj93lrLqjJGXX-AgfE_Q' 
// });



