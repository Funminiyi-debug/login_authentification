const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')
  
const User = require('../models/UserModel');

module.exports = (passport) => {
    
    passport.use(
        new LocalStrategy( { 
            usernameField: 'email', 
            passwordField: 'password' }, 
            
            (email, password, done) => {
            // using callback instead of promise 
            User.findOne({ email: email }, (err, user) => {
            
                if (err) { return done(err); }

            // if there is no user with the email 
                if (!user) {
                return done(null, false, { message: 'Email not registered!' });
                }

            // check the passpord
            //  first check the hashedPassword with the one in database 
                bcrypt.compare(password, user.password, (err, isMatch) => {
                // error here is from bcrypt 
                    if(err) throw err

                    // here there is a match
                    if(isMatch) {
                        return done(null, user);
                    }
                    else {
                    // now you can say it doesn't exist
                        return done(null, false, { message: 'Incorrect password.' });
                    }    
                })      
            })   
        })
    )
    
    // now that we have the configuration middleware, let's serialize and deserialize some users 
    passport.serializeUser((user, done) => {
        done(null, user.id)
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        });
    })

}