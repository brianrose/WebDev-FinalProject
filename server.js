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
    name: String,
    fans: [{ type: mongoose.Schema.ObjectId, ref: 'UserModel' }]
}, { collection: 'teams' });

var TeamModel = mongoose.model('TeamModel', TeamSchema);

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    favoriteTeams: [ {type: mongoose.Schema.ObjectId, ref : 'TeamModel'} ]
});

var UserModel = mongoose.model('UserModel', UserSchema);

app.get('/api/team', function (req, res) {
    TeamModel.find(function (err, teams) {
        res.json(teams);
    });
});

app.get('/api/team/name/:name', function (req, res) {
    var name = req.params.name;
    TeamModel.find({ $or: [{ abbr: name }, { nickname: name }, { name: name }] }, function (err, teams) {
        res.json(teams);
    });
});

app.get('/api/team/id/:id', function (req, res) {
    var id = req.params.id;
    TeamModel.findById(id, function (err, team) {
        res.json(team);
    });
});

app.put('/api/addToFavoriteTeams/:userid/:teamid', function (req, res) {
    var userid = req.params.userid;
    var teamid = req.params.teamid;

    UserModel.findById(userid, function (err, user) {
        user.favoriteTeams.push(teamid);
        user.save(function (err, user) {
            res.json(user);
        });
    });
    TeamModel.findById(teamid, function (err, team) {
        team.fans.push(userid);
        team.save();
    });
});

app.get('/api/favoriteTeams/:userid', function (req, res) {
    console.log("Get favorite teams");
    UserModel.findById(req.params.userid, function (err, user) {
        if (user)
        {
            console.log(user);
            res.json(user.favoriteTeams);
        }
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
            newUser.favoriteTeams = [];
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

app.get('/api/initDb', function (req, res) {
    var teams = [
         {
             "abbr": "ARI",
             "nickname": "Diamondbacks",
             "name": "Arizona"
         },
         {
             "abbr": "ATL",
             "nickname": "Braves",
             "name": "Atlanta"
         },
         {
             "abbr": "BAL",
             "nickname": "Orioles",
             "name": "Baltimore"
         },
         {
             "abbr": "BOS",
             "nickname": "Red Sox",
             "name": "Boston"
         },
         {
             "abbr": "CHC",
             "nickname": "Cubs",
             "name": "Chicago"
         },
         {
             "abbr": "CHW",
             "nickname": "White Sox",
             "name": "Chicago"
         },
         {
             "abbr": "CIN",
             "nickname": "Reds",
             "name": "Cincinnati"
         },
         {
             "abbr": "CLE",
             "nickname": "Indians",
             "name": "Cleveland"
         },
         {
             "abbr": "COL",
             "nickname": "Rockies",
             "name": "Colorado"
         },
         {
             "abbr": "DET",
             "nickname": "Tigers",
             "name": "Detroit"
         },
         {
             "abbr": "HOU",
             "nickname": "Astros",
             "name": "Houston"
         },
         {
             "abbr": "KC",
             "nickname": "Royals",
             "name": "Kansas City"
         },
         {
             "abbr": "LAA",
             "nickname": "Angels",
             "name": "Los Angeles"
         },
         {
             "abbr": "LAD",
             "nickname": "Dodgers",
             "name": "Los Angeles"
         },
         {
             "abbr": "MIA",
             "nickname": "Marlins",
             "name": "Miami"
         },
         {
             "abbr": "MIL",
             "nickname": "Brewers",
             "name": "Milwaukee"
         },
         {
             "abbr": "MIN",
             "nickname": "Twins",
             "name": "Minnesota"
         },
         {
             "abbr": "NYM",
             "nickname": "Mets",
             "name": "New York"
         },
         {
             "abbr": "NYY",
             "nickname": "Yankees",
             "name": "New York"
         },
         {
             "abbr": "OAK",
             "nickname": "Athletics",
             "name": "Oakland"
         },
         {
             "abbr": "PHI",
             "nickname": "Phillies",
             "name": "Philadelphia"
         },
         {
             "abbr": "PIT",
             "nickname": "Pirates",
             "name": "Pittsburgh"
         },
         {
             "abbr": "SD",
             "nickname": "Padres",
             "name": "San Diego"
         },
         {
             "abbr": "SF",
             "nickname": "Giants",
             "name": "San Francisco"
         },
         {
             "abbr": "SEA",
             "nickname": "Mariners",
             "name": "Seattle"
         },
         {
             "abbr": "STL",
             "nickname": "Cardinals",
             "name": "St. Louis"
         },
         {
             "abbr": "TB",
             "nickname": "Rays",
             "name": "Tampa Bay"
         },
         {
             "abbr": "TEX",
             "nickname": "Rangers",
             "name": "Texas"
         },
         {
             "abbr": "TOR",
             "nickname": "Blue Jays",
             "name": "Toronto"
         },
         {
             "abbr": "WAS",
             "nickname": "Nationals",
             "name": "Washington"
         }
    ];

    TeamModel.remove(function (err) {
        console.log("teams cleared");

        for (var i = 0; i < teams.length; i++) {
            var tm = new TeamModel(teams[i]);
            tm.save();
        }
    });


    res.send(200);
})

ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

app.listen(port, ip)