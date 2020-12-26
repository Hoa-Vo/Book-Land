const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const localstrategy = require("passport-local").Strategy;
const accountModel = require("./models/accountModel"); 
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const booksListRouter = require("./routes/bookslist");
const accountRouter = require("./routes/account");
require("./database/db");
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));
app.use("/bookslist", express.static(path.join(__dirname, "public")));
app.use("/bookslist/search", express.static(path.join(__dirname, "public")));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localstrategy (
   async function(username,password,done)
  {
     console.log("Inside strategy execution"); 
     const existUser = await accountModel.getUserByUsername(username); 
     console.log(`Inside strategy execution: ${existUser}`); 
     if(existUser === null || existUser === undefined)
     {
       return done(null,false, {message: 'User not exist '});
     }
     // check password
     console.log(existUser);
     const idToCheckPassword = existUser._id; 
     console.log("type of id: "); 
     console.log(typeof idToCheckPassword);
     console.log(`Inside strategy execution: id: ${idToCheckPassword}`); 
     const passwordCheck = await accountModel.checkValidPassword(idToCheckPassword,password); 
     console.log(`Inside strategy execution: passcheck: ${passwordCheck}`); 

     if(!passwordCheck)
     {
       return done(null,false, {message: 'Incorrect password'}); 
     }
     return done(null,existUser); 
  }
));

passport.serializeUser(function(user,done){
  done(null,user._id); 
});

passport.deserializeUser(async function(id,done) 
{
  const user = await accountModel.getUserById(id); 
  done(null,user); 
})


app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/bookslist", booksListRouter);
app.use("/account", accountRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
