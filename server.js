var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
//var session = require('express-session');
var uuid = require('node-uuid');
var cookieParser  = require('cookie-parser');

//app.set('view engine', 'ejs');

//console.log("secret");
//console.log(process.env.PASSPORT_SECRET);


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(cookieParser());


//app.use(session({
//    secret: process.env.PASSPORT_SECRET,
//    resave: false,
//    saveUninitialized: true
//}));
//app.use(passport.initialize());
//app.use(passport.session());

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;


app.get('/hello', function(req, res){
    res.send('hello world');
});

// for services
require("./public/project/server/app.js")(app);
require("./public/assignment/server/app.js")(app);

app.listen(port, ipaddress, function() {
 console.log("May the Force be with you!!");
 });
