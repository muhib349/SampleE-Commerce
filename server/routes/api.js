const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testdb',{ useNewUrlParser: true, useUnifiedTopology: true });


const Schema = mongoose.Schema;
var userSchema = new Schema({
    name: {type:String, required: true},
    email: {type:String, required: true},
    age: Number,
},{collation:'users'});

var productSchema = new Schema({
    title: {type:String, required: true},
    description: {type:String, required: true},
    quantity: Number,
    price: Number,
    img: String
},{collation: 'products'});

var Users = mongoose.model('Users',userSchema);
var Products = mongoose.model('Products',productSchema);


router.get('/',(req, res)=>{
    res.send("Post worked1");
});

router.post('/add_user',(req, res,next)=>{
    var item = {
        name: "Zishan",
        email: "zishan@gmail.com",
        age: 27
    };

    var user = new Users(item);
    user.save();

    res.send(user);
});

router.get('/get_user',function(req,res){
    Users.findOne({email:'muhibgazi@gmail.com'}).then(function(doc){
       // res.setHeader('Content-Type', 'application/json');
        //res.sendStatus(200);
        res.send(doc)
    });
})

router.get('/get_product',function(req,res){
    Products.find().then(function(doc){
        res.send(doc)
    });
})


module.exports = router