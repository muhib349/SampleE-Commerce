const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');
const { element } = require('protractor');
mongoose.connect('mongodb://localhost:27017/testdb',{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);


const Schema = mongoose.Schema;
var userSchema = new Schema({
    name: {type:String, required: true},
    email: {type:String, required: true},
    age: Number,
},{collation:'users'});

var Users = mongoose.model('Users',userSchema);

var productSchema = new Schema({
    title: {type:String, required: true},
    description: {type:String, required: true},
    quantity: Number,
    price: Number,
    img: String
},{collation: 'products'});

var Products = mongoose.model('Products',productSchema);

var orderSchema = new Schema({
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{"product_id":Schema.Types.ObjectId, "title": String, "quantity": Number, "subtotal": Number}],
    orderStatus: String,
},{collation: 'oders'});

var Order = mongoose.model('Order',orderSchema);




router.get('/',(req, res)=>{
    res.send("Post worked1");
});

router.post('/add_order',function(request, response){
    var body = request.body

    var cart_product = [];

    body.carts.forEach(element => {
        var obj = {
            "product_id": element.product._id,
            "title": element.product.title,
            "quantity": element.quantity,
            "subtotal": element.subtotal
        };
        cart_product.push(obj);
    });

    var item = {
        user: body.user,
        products: cart_product,
        orderStatus: body.orderStatus
    }

    var order = new Order(item)
    order.save((err, order) => {
        if(err){
            response.status(400).send(err)
        }else{
            updateProduct(body.carts);
            response.status(200).json(order);
        }
    })
})

function updateProduct(carts){

    carts.forEach(element =>{
        Products.findOneAndUpdate({"_id": element.product._id}, {"$set":{"quantity": element.product.quantity - element.quantity}}).exec((err, product) => {
            if(err){
                console.log(err);
            }else{
                //console.log(product);
            }
        })
    });
}

router.post('/add_user',(req, res,next)=>{
    var item = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
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