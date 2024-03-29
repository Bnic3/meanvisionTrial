/**
 * Created by john.nana on 11/14/2014.
 */

/*var passport = require('passport');*/
var mongoose = require('mongoose');
var User = mongoose.model('User');
var LocalStrategy= require('passport-local').Strategy;

module.exports = function (passport) {
                    passport.serializeUser(function (user, done) {
                        done(null, user._id);
                    });

                    passport.deserializeUser(function (id, done) {
                        User.findById(id, function (err, user) {
                            done(err, user);
                        });
                    });


                // passport/login.js
                    passport.use(new LocalStrategy(
                        function(username, password, done) {
                            User.findOne({ username: username }, function (err, user) {
                                if (err) { return done(err); }
                                if (!user) {
                                    return done(null, false, { message: 'Incorrect username.' });
                                }
                                if (user.password != password) {
                                    return done(null, false, { message: 'Incorrect password.' });
                                }
                                return done(null, user);
                            });
                        }
                    ));
                }; //end function
