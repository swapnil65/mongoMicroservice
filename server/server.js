require('rootpath')();
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var config = require('config.json');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use('/meetingInfo', require('./controllers/meetingInfo.controller'));
app.use('/user', require('./controllers/authenticate.controller'));




// start server
var port = process.env.NODE_ENV === 'production' ? 80 : 4200;
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});