var express = require('express');
var mongoose = require('mongoose');

var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/test'

mongoose.connect(connectionString);
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();

var TeamSchema = new mongoose.Schema({
    city: String,
    nickname: String,
    created: { type: Date, default: Date.now }
}, { collection: 'team' });

var TeamModel = mongoose.model('TeamModel', TeamSchema);

app.get('/api/team', function (req, res) {
    TeamModel.find(function (err, teams) {
        res.json(teams);
    });
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.use(express.static(__dirname + '/public'));

ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

app.listen(port, ip)