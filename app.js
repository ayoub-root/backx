var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv/config')
var indexRouter = require('./routes/index');
var accountRouter = require('./routes/Accounts');

var assessmentRouter = require('./routes/Assessments');
var assessmentModelsRouter = require('./routes/AssessmentsModels');
var assessmentListsRouter = require('./routes/AssessmentsLists');
var evaluationRouter = require('./routes/Evalautions');

var exercisesRouter = require('./routes/Exercises');
var notesRouter = require('./routes/Notes');
var filtersRouter = require('./routes/Filters');
var blocksRouter = require('./routes/Blocks');
var itemsRouter = require('./routes/Items');
var componentsRouter = require('./routes/Components');
var patientRouter=require('./routes/patients');
var userRouter=require('./routes/Users');
var professionalRouter=require('./routes/Professionals')
var professionsRouter=require('./routes/Professions')

const session = require('express-session'); //we're using 'express-session' as 'session' here
cors = require("cors");


var app = express();
var mongoose= require('mongoose');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// app.use((req,res,next)=> {    
//    res.header("Access-Control-Allow-Origin", "*");    
//     res.header("Access-Control-Allow-Credentials", "true");  
//        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT"); 
//            res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"); 
//   next(); });
  app.use(cors());
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true , useUnifiedTopology: true })
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));


app.use(cookieParser());
// app.use((req, res, next) => {
//   console.log(req.session)
//   if (req.session.account) {
//     console.log(req.session)
//   next();
//   } else {
//    //res.status(401).send('Authrization failed! Please login');
//   }
//   });
app.use('/', indexRouter);
app.use('/accounts', accountRouter);
app.use('/patients', patientRouter);
app.use('/users', userRouter);
app.use('/professionals', professionalRouter);

app.use('/assessments', assessmentRouter);

app.use('/assessmentsmodels', assessmentModelsRouter);
app.use('/assessmentslists', assessmentListsRouter);
app.use('/evaluations', evaluationRouter);
app.use('/blocks', blocksRouter);
app.use('/items', itemsRouter);
app.use('/components', componentsRouter);

app.use('/exercises', exercisesRouter);
app.use('/notes', notesRouter);
app.use('/professions', professionsRouter);

app.use('/filters', filtersRouter);







// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
