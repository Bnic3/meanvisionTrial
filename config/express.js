/**
 * Created by john.nana on 11/10/2014.
 */
var express = require('express'),
    cons = require('consolidate'),
    swig = require('swig'),
    expressSession = require('express-session'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'),
    mongoose = require('mongoose'),

    passportLocal = require('passport-local'),
    path = require('path');


var routes = require('../routes'),
    api = require('../routes/api');





module.exports = function (app, passport){
    app.engine('html', cons.swig);
    app.set('view engine', 'html');
    app.set('views', path.join(app.get('root'), '/views'));

    swig.setDefaults({ varControls: ['<<%', '%>>'] });

   /* passport dependencies*/
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false}));
    app.use(cookieParser());


    /*configuring passport auth*/
    app.use(expressSession({secret: 'mySecretKey', resave: false, saveUninitialized: false,}));
    app.use(passport.initialize());
    app.use(passport.session());

    require("./passport.js")(passport);

   /* passport.use(new passportLocal.Strategy(function(username, password, done){
        if (username === password){ done(null, {id: username, name: username});}
        else{ done(null,null);}

    }));
     passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
       done(null, {id: id, name: id})
    });*/


    /*trial2*/
   /* passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });*/


    app.use(methodOverride());
    app.use(express.static(path.join(app.get('root'), 'public')));

    app.get('/', routes.index);
    app.get('/login', function(req, res){res.render("login")});
    app.post('/login', passport.authenticate('local',{ successRedirect: '/show',failureRedirect: '/login' }));

    app.get('/show', function(req, res){res.render("partials/main",{isAuthenticated: req.isAuthenticated(), user: req.user})});
   app.get('/partials/:name', routes.partials);

};