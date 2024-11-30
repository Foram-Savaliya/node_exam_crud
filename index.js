const express = require('express');

const port = 8000;

const app = express();

app.set('view engine','ejs');

// connection database in mongodb
const db = require('./config/db')

// connect userModel connection
const userModel = require("./models/UserModel");

app.use(express.urlencoded());

app.get('/',(req,res) => {
    res.render('Add');
})

app.post('/insertRecord',(req,res) => {
    const {book_title,author,price,category} = req.body;
    userModel.create({
        book_title : book_title,
        author : author,
        price : price,
        category : category
    })
    .then(() => {
        console.log("Record added Successfully....");
        res.redirect('/')        
    })
    .catch((err) => {
        console.log(err);
        return false;
    });
});

app.get('/viewRecord',(req,res) => {
    userModel.find({})
    .then((book) => {
        return res.render('View',{
            book : book
        })
    }).catch((err) => {
        console.log(err);
        return false;
    })
});

app.put('/editRecord',(req,res) => {
    const id = req.body.id;
    const {book_title,author,price,category} = req.body;
    userModel.findByIdAndUpdate(id,{
        book_title : book_title,
        author : author,
        price : price,
        category : category
    })
    .then(() => {
        console.log("Record updated Successfully....");
        res.redirect('/viewRecord');
    })
    .catch((err) => {
        console.log(err);
        return false
    });
})

app.get('/deleteRecord',(req,res) => {
    const ids = req.body.d_id;
    userModel.findByIdAndDelete(ids)
    .then((response) => {
        console.log("Record deleted Successfully....");
        res.redirect('/viewRecord');
    })
    .catch((err) => {
        console.log(err);
        return false
    });
        
})

app.listen(port,(err) => {
    if(err){
        console.log(err);
        return false;
    }
    console.log(`server is start on port : ${port}`);
})