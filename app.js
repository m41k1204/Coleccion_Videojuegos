var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const logger = require('morgan');
const { fetchCommonData } = require('./midleware/commonData')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const paginaPrincipalRouter = require('./routes/principal');

const app = express();

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

app.use('/stylesheets', express.static(__dirname + '/public/stylesheets'));
app.use('/images', express.static(__dirname + '/public/images'));

app.use(fetchCommonData);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/principal', paginaPrincipalRouter);


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
