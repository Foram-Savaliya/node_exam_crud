const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost/Exam-Crud`);

const db = mongoose.connection;

db.on("connected",(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`database is successfully connected`);
})

module.exports = db;