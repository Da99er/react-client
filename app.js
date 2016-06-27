var fs = require('fs');

var blf = {}; //Before load functions

//initialisation before load functions
fs.readdirSync(__dirname + '/beforeLoadFunctions').forEach((e) => {
    console.log(e);
    var returned = require(__dirname + '/beforeLoadFunctions/' + e);
    if (returned) {
        blf[e.split(".js")[0]] = returned;
    }
});

console.log("blf".red);

var app = blf.koa();

//files
app.use(function*(next) {
    if (~this.path.indexOf('.js') || ~this.path.indexOf('.css')) {
        this.type = "text/css";
        this.body = yield blf.mz_fs.readFile(__dirname + '/public' + this.path);
    } else {
        yield * next;
    }
});


//passport
var session = require('koa-generic-session');
app.keys = ['secret'];
app.use(session({
	ttl:60*60*1000
}));

//body parser
var bodyParser = require('koa-bodyparser');
app.use(bodyParser());

//mongo models
var user_model = require('./models/models').user;

//authentication
var passport = require('koa-passport');

passport.serializeUser(function(user, done) {
    done(null, user.id);
})

passport.deserializeUser(function(id, done) {
    user_model.findById(id, function(err, user) {
        if (err) {
            done(err);
        } else {
            done(null, user);
        }
    });
});


var LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, function(username, password, done) {
    user_model.findOne({ username: username }, (err, user) => {
    	console.log("err".red,err,user);
    	console.log("check values".blue,username,password);
        if (err) {
            return done(err);
        }

        if (!user&&user.username!=username) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        if (!user&&user.password!=password) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    });

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function*(next){
	console.log("check".green,this.isAuthenticated());
	yield * next;
})

//public routes

var Router = require('koa-router');

var public = new Router();

public.get('/', function() {
    this.body = blf.jade.renderFile(__dirname + '/front_side/index.jade', { test: 1212, title: "social net" });
});

public.post('/sign_up',function*(next){
	var answer = "user was added";
	var new_user_data = this.request.body;
	console.log(new_user_data);
	var new_user = new user_model({
		username:new_user_data.username,
		password:new_user_data.password
	});
	yield new_user.save().then(()=>{},(err)=>{answer = 'error added: '+err});
	this.body = answer;
});

public.post('/login', function*(next) {
    var ctx = this;
    var data = this.request.body;
    console.log(data);
    yield * passport.authenticate('local', function*(err, user, info) {
        console.log("$$", err, user, info);
        if (err) throw err;

        if (user === false) {
            ctx.status = 401;
            console.log("not log", user.getInfoFields);
            ctx.body = user;
        } else {
            yield ctx.login(user);
            console.log("succes", user.getInfoFields);
            ctx.body = "succes";
        }

    }).call(this, next);

});

public.post('/logout',function*(next){
	this.logout();
	this.body = "good bye";
});

app.use(public.middleware());
app.listen(3000);
console.log("127.0.0.1:3000")
