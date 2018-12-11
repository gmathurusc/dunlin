var express = require('express');
var router = express.Router();
var request = require('request');


module.exports = app => {
    app.get('/',function(req,res){
        console.log("home");
        res.render('index.ejs');
    });

    app.get('/success',function(req,res){
        console.log("success");
        res.render('success.ejs');
    });
};