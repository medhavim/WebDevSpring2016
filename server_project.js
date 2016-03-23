var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3005;

// for services
require("./public/project/server/app.js")(app);



app.listen(port, ipaddress, function() {
 console.log("May the Force be with you!!");
 });
