const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const User = require('./models/UserModel');
const expressLayouts = require('express-ejs-layouts');
// const bcrypt = require('bcryptjs');
const session = require('express-session');
const flash = require('connect-flash')
const passport = require('passport')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config({ path: './config/config.env' })


// use the passport config 


// call expressLayouts and use it to render the ejs 
app.use(expressLayouts)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
// setup express to serve static files 
app.use(express.static(path.join(__dirname, 'public')));

// configure express to send json
app.use(express.json())

// connect mongoose 


const port = process.env.PORT || 4000
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

require('./config/passport')(passport)

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log(`THE DATABASE HAS BEEN CONNECTED`)
}).catch(err => console.log(err))

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


app.listen(port, console.log('Server working on port %s', port));

