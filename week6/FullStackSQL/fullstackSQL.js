const express = require('express')
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'password',
    database: 'theCoffeeStop'
})

db.connect((err) => {
    if (err){
        throw err;
    }
    console.log("MySQL database connected successfully");
});

const app = express();

app.listen('4040', () => {
    console.log('Local connection running successfully');
});

app.get('/CreateDB', (req, res) => {
    let sqlString = 'CREATE DATABASE theCoffeeStop'

    db.query(sqlString, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result)
        res.send("theCoffeeStop created successfully!")
    })
});

app.get('/CreateTable', (req, res) => {
    let sqlString = 'CREATE TABLE coffeeTime ( id INT auto_increment, title VARCHAR(50), description VARCHAR(100), PRIMARY KEY(id) )'

    db.query(sqlString, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result)
        res.send("CoffeeTime table created successfully!")
    })
});

app.get('/InsertRow1', (req, res) => {
    let row1 = {title: 'Regular', description: 'Coffee black'}
    let sqlString = 'INSERT INTO coffeeTime SET ?'

    db.query(sqlString, row1, (err, result) =>{
        if (err){
            throw err;
        }
        console.log(result)
        res.send('Row added successfully!')
    })
});

app.get('/InsertRow2', (req, res) => {
    let row1 = {title: 'Irish Coffee', description: 'The coffee the irish way!'}
    let sqlString = 'INSERT INTO coffeeTime SET ?'

    db.query(sqlString, row1, (err, result) =>{
        if (err){
            throw err;
        }
        console.log(result)
        res.send('Row added successfully!')
    })
});

app.get('/InsertNewRow', (req, res) => {
    let row1 = {title: 'Hazelnut', description: 'Just like the regular but with hazelnut, either hot or on ice! '}
    let sqlString = 'INSERT INTO coffeeTime SET ?'

    db.query(sqlString, row1, (err, result) =>{
        if (err){
            throw err;
        }
        console.log(result)
        res.send('Row added successfully!')
    })
});

app.get('/GetPosts', (req, res) => {
    let sqlString = 'SELECT * FROM coffeeTime'

    db.query(sqlString, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result)
        res.send("CoffeeTime table selected successfully!")
    })
});

app.get('/GetPosts/:id', (req, res) => {
    let sqlString = `SELECT * FROM coffeeTime WHERE id = ${req.params.id}`

    db.query(sqlString, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result)
        res.send("Item selected successfully!")
    })
});

app.get('/UpdatePosts/:id', (req, res) => {
    let newTitle = 'The regular'
    let sqlString = `UPDATE coffeeTime SET title = '${newTitle}' WHERE id = ${req.params.id}`

    db.query(sqlString, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result)
        res.send("Item updated successfully!")
    })
});

app.get('/DeletePosts/:id', (req, res) => {
    let newTitle = 'The regular'
    let sqlString = `DELETE FROM coffeeTime WHERE id = ${req.params.id}`

    db.query(sqlString, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result)
        res.send("Item deleted successfully!")
    })
});