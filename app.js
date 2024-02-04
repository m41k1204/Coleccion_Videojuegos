var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const logger = require('morgan');
const { fetchCommonData } = require('./midleware/commonData')
const passport = require("passport");
const session = require('express-session')
const WebAppStrategy = require('ibmcloud-appid').WebAppStrategy;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const paginaPrincipalRouter = require('./routes/principal');

const app = express();

const CALLBACK_URL = "/ibm/cloud/appid/callback";

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoDB = 'mongodb+srv://m41k12:B4N4n412$@videojuegos.fqwfpby.mongodb.net/test?retryWrites=true&w=majority'

async function main() {
  try {
    await mongoose.connect(mongoDB);
    // Continue with other code that relies on the database connection
  } catch (err) {
    console.error(err);
  }
}

main().catch((err) => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
	secret: "123456",
	resave: true,
	saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));
passport.use(new WebAppStrategy({
  clientId: "919262a5-b17d-4a18-b37e-556d4810df80",
  tenantId: "a58d648d-6c2c-41f3-84fb-11a97ebd8fdf",
  secret: "ZmUyODIyNWMtOGU2ZS00ZDQ1LWEyMTEtOTBlZjY0MTI5ODU5",
  oAuthServerUrl: "https://us-south.appid.cloud.ibm.com/oauth/v4/a58d648d-6c2c-41f3-84fb-11a97ebd8fdf",
  redirectUri: "http://localhost:8000/appid/callback"
}));

app.get('/appid/login', passport.authenticate(WebAppStrategy.STRATEGY_NAME ,{
  successRedirect: '/principal', 
  forcedLogin: true,
}))

app.get('/appid/callback', passport.authenticate(WebAppStrategy.STRATEGY_NAME, { failureRedirect: '/error', session: false }));

app.get('/appid/logout', function(req, res) {
  WebAppStrategy.logout(req);
  res.redirect('/');
})
//app.use(passport.authenticate(WebAppStrategy.STRATEGY_NAME))

app.use(fetchCommonData);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/principal', paginaPrincipalRouter)
app.use('/stylesheets', express.static(__dirname + '/public/stylesheets'));
app.use('/images', express.static(__dirname + '/public/images'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).render('notfound', {
    title: 'Pagina no encontrada'
  } 
  );
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
