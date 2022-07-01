const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});
const fs = require('fs');
// const path = require('path');
const { db } = require('./database');
var bodyParser = require('body-parser');
// const cloudinary = require('cloudinary')
const sqlRoutes = require('./routes/sqlRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(bodyParser.json())
app.use('/sqlRoutes', sqlRoutes)

var connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'password',
  database: 'pictureshare'
})
 
connection.connect()

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



