const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/UserModel');
const expressLayouts = require('express-ejs-layouts');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const flash = require('connect-flash')
const passport = require('passport')
const path = require('path')

require('dotenv').config()



//my database link
const DATABASEURL = process.env.DATABASEURL

// use the passport config 
require('./config/passport')(passport)


// call expressLayouts and use it to render the ejs 
app.use(expressLayouts)
app.set('view engine', 'ejs');

// setup express to serve static files 
app.use(express.static(path.join(__dirname, 'public')));

// configure express to send json
app.use(express.json())

// connect mongoose 
mongoose.connect(DATABASEURL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log(`database has been connected`)
}).catch(err => console.log(err))



// to include body parser
app.use(express.urlencoded( { extended: true }));


// app.use(cookieParser('secretString'));
// app.use(session({cookie: { maxAge: 60000 }}))

// configure session middleware 
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }))

  // add the passport middleware 
  app.use(passport.initialize());
  app.use(passport.session());

app.use(flash())

  // our middleware to set local variables 
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next()
})

// get route for the root app
app.get('/', (req, res) => {
    res.render('homepage', {
      title: 'FoodNowApp'
    });
})

app.get('/map', (req, res) => {
  res.render('map', {
    title: "Map"
  })
})

app.use('/users', require('./routes/register-route'))


app.listen(2000, console.log('Server working on port ', 2000));

