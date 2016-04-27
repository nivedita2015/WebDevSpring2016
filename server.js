//var express = require('express');
//var app = express();
//var bodyParser    = require('body-parser');
//var multer        = require('multer');
//var db;
//var passport      = require('passport');
//var cookieParser  = require('cookie-parser');
//var session       = require('express-session');
//
//
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));
////app.use(multer());
//multer();
//app.use(express.static(__dirname + '/public'));
//app.use(session({
//    secret: 'this is the secret',
//    resave: true,
//    saveUninitialized: true
//}));
//app.use(cookieParser());
//app.use(passport.initialize());
//app.use(passport.session());
//
//
//var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
//var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
//
//var mongoose = require('mongoose');
//var connectionString = 'mongodb://127.0.0.1:27017/cs5610';
//// use remote connection string
//// if running in remote server
//if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
//    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
//        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
//        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
//        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
//        process.env.OPENSHIFT_APP_NAME;
//}
//db = mongoose.connect(connectionString);
//
//require("./public/assignment/server/app.js")(app,db,mongoose);
//require("./public/project/server/app.js")(app,db,mongoose);
//app.listen(port, ipaddress);

var express = require('express');
var app = express();
var bodyParser    = require('body-parser');
//var multer        = require('multer');
var uuid = require('node-uuid');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose      = require('mongoose');
var passport = require('passport');


var connectionString = 'mongodb://127.0.0.1:27017/cs5610fall2015exmpl1';


if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}


var db = mongoose.connect(connectionString);



app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.bodyParser({ uploadDir: './public/uploads' }));
//app.use(multer());


app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "this is my secret"
}));
app.use(passport.initialize());
app.use(passport.session());




var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

require("./public/assignment/server/app.js")(app, db, mongoose);
//require("./public/project/server/app.js")(app,db,mongoose);


app.listen(port, ipaddress);





