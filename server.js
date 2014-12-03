/**
 * Created by john.nana on 11/3/2014.
 */

var express = require('express'),
    api = require('./routes/api'),
    http = require('http'),
    mongoose = require('mongoose'),
    dbConfig= require('./db.js'),
    passport = require('passport'),
    path = require('path');

var app = express();
var env = process.env.NODE_ENV || 'development';


app.set('port', process.env.PORT || 3000);
app.set('root', __dirname);

// Bootstrap models
/*fs.readdirSync(__dirname + '/models').forEach(function (file) {
    if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});*/

require('./models/user.js');
var User = mongoose.model('User');



require("./config/express")(app, passport);





/*connection  to the database*/
/*if(env === 'production'){dbConfig.url = "mongodb://bnice:V$parameter12@ds053380.mongolab.com:53380/meanvision";
    mongoose.createConnection(dbConfig.url);}
else if (env ==='development'){dbConfig.url= 'mongodb://localhost/meanvision';
    mongoose.createConnection(dbConfig.url);}*/
mongoose.createConnection(dbConfig.url);


/*var db= mongoose.connection;
db.on('error', console.error.bind(console, 'connection error....'));
db.once('open', function callback(){console.log("meanvision opened")});


User.find(function(err, doc){if(err) throw err;

    console.log(doc)});*/


/*var newUser= new User({username:"Jane",password:"smith",email:"jane.smith@node.com", gender:"Male", address:"Lagos"});
newUser.save(function(err, doc){if(err) throw err;

    console.log(doc.email+" is the email addy");})*/







http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));

});