const express = require('express');
const sqlRoutes = express.Router();


  
sqlRoutes.get('/GetPosts', (req, res) => {
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
  
  sqlRoutes.get('/GetPosts/:id', (req, res) => {
    let sqlString = `SELECT * FROM posts WHERE PostID = ${req.params.id}`
  
    connection.query(sqlString, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result)
        res.send("Item selected successfully!")
    })
  });

  
  sqlRoutes.post('/InsertNewRow', (req, res) => {
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
  
  sqlRoutes.put('/UpdatePosts/:id', (req, res) => {
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
  
  sqlRoutes.delete('/DeletePosts/:id', (req, res) => {
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

module.exports = sqlRoutes;