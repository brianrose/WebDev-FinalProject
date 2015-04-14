var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.use(express.static(__dirname + '/public'));

var courses = [{ name: "Java 101", category: "PROG", dateCreated: "1/1/2015", description: "Wow" },
  { name: "MongoDB 101", category: "DB", dateCreated: "2/1/2015", description: "Good" },
  { name: "Express 101", category: "PROG", dateCreated: "3/1/2015", description: "Better" },
  { name: "AngularJS 101", category: "WEB", dateCreated: "4/1/2015", description: "Best" },
  { name: "NodeJS 101", category: "PROG", dateCreated: "5/1/2015", description: "Awesome" }
];

app.get('/api/course', function (req, res) {
    res.send(courses);
});

app.post('/api/course', function (req, res) {
    courses.push(req.body);
    res.send(courses);
})

app.put('/api/course/:index', function (req, res) {
    courses[req.params.index] = req.body;
    res.send(courses);
})

app.get('/api/course/:index', function (req, res) {
    res.send(courses[req.params.index]);
})

app.delete('/api/course/:index', function (req, res) {
    courses.splice(req.params.index, 1);
    res.send(courses);
})

ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

app.listen(port, ip)