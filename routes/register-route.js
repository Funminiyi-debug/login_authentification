const express = require('express');
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const router = express.Router()
const passport = require('passport')

// get routing for login page 
router.get('/login', (req, res) => {
    res.render('register', {
        title: 'sign in'
    })
})
// post routing to the register page 
router.post('/register', async (req, res, next) => {
    const errors = []
    const { firstName, lastName, email, phone, password, password2, agree } = req.body
    const testExistence = !firstName || !lastName || !phone || !password || !password2
    if(typeof agree == 'undefined') {
        errors.push({ "message": "You must read and agree to the terms and conditions"})
    }
    
    if(testExistence) {
        errors.push({  "message": "fields cannot be empty" })     
    }

    if( password != password2) {
        errors.push({ "message": "Password must match" })
    }

    if( password.length < 6) {
        errors.push({ "message": "Password length must be greater than 6" })
    }

    if (errors.length > 0) {
        res.render('register', {
            errors, firstName, lastName, email, phone, password, password2
        })
    }

    User.findOne( { email: email })
    .then( async (user) => {
        if (!user) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            
        // create a User instance
            const user = new User({ firstName, lastName, email, phone, password: hashedPassword})
            user.save()
            .then(user => {
                req.flash('success_msg', 'You can now login in!')
                res.redirect('/users/login')
            })
            .catch(err => console.log('this error occured while saving the file: ', err))         
        }  else {            
            errors.push({ "message": "email already exists" })
            res.render('register', {
                errors, firstName, lastName, email, phone, password
            })
         }
  }).catch(err => console.log(err))
})    

// login post handling 
router.post('/login', (req, res, next) => {
    passport.authenticate('local', { 
        successRedirect: '/dashboard',
        failureRedirect: '/users/login', 
        failureFlash: true
    })(req, res, next);
})

// export the router
module.exports = router