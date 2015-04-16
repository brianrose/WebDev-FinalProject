var express = require('express');
var mongoose = require('mongoose');

var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/test'

mongoose.connect(connectionString);
var bodyParser = require('body-parser');

var multer = require('multer');
var app = express();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'this is the secret' }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new LocalStrategy(function (username, password, done) {
    UserModel.findOne({ username: username, password: password }, function (err, user) {
        if (user)
        {
            return done(null, user);
        }
        return done(null, false, { message: 'Unable to login' });
    })
}));

var TeamSchema = new mongoose.Schema({
    abbr: String,
    nickname: String,
    name: String
}, { collection: 'teams' });

var TeamModel = mongoose.model('TeamModel', TeamSchema);

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});

var UserModel = mongoose.model('UserModel', UserSchema);

app.get('/api/team', function (req, res) {
    TeamModel.find(function (err, teams) {
        res.json(teams);
    });
});

app.get('/api/team/:name', function (req, res) {
    var name = req.params.name;
    TeamModel.find({ $or: [{ abbr: name }, { nickname: name }, { name: name }] }, function (err, teams) {
        res.json(teams);
    });
});

app.post("/login", passport.authenticate('local'), function (req, res) {
    res.json(req.user);
});

app.post("/register", function (req, res) {
    UserModel.findOne({username: req.body.username}, function(err, user) {
        if (user)
        {
            res.send(200);
            return;
        }
        else
        {
            var newUser = new UserModel(req.body);
            newUser.save(function (err, user) {
                req.login(user, function (err) {
                    if (err) { return next(err); }
                    res.json(user);
                });
            });
        }
    });
});

app.get("/loggedin", function (req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});

app.post("/logout", function (req, res) {
    req.logout();
    res.send(200);
});

ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

app.listen(port, ip)