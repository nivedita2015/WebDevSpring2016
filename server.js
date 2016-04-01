var express = require('express');
var app = express();

var bodyParser    = require('body-parser');
var multer        = require('multer');
var db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());
app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/cs5610');

require("./public/assignment/server/app.js")(app,db,mongoose);
require("./public/project/server/app.js")(app);
app.listen(port, ipaddress);