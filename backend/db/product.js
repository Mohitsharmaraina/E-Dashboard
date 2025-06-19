const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({name:String,price:String,category:String,company:String, uId:String});

module.exports  = mongoose.model('Product',productSchema);