const User = require('../models/User'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const passwordValidator = require('password-validator')

/* Regex to validate email  */

function validateEmail(email){
    var emailReg = new RegExp(/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i);
    var valid = emailReg.test(email);

    if(!valid) {
        return false;
    } else {
        return true;
    }
}

/* Check if the password is in good format */

const schema = new passwordValidator()

schema
.is().min(8)                                    
.is().max(50)                                  
.has().uppercase()                              
.has().lowercase()                              
.has().digits(1)                                
.has().not().spaces()                           
.is().not().oneOf(['Passw0rd', 'Password123']);

// Function to signup a new User 

exports.signup = (req, res, next) => {
    if (schema.validate(req.body.password) && validateEmail(req.body.email)){
        bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash,
        })
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé'}))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
    } else {
        return res.status(400).json({ message: 'bad request' })    
    }
}

// Function to login a User

exports.login = (req, res, next) => {
    User.findOne({
        email: req.body.email,
    })
    .then(user => {
        if (!user){
            return res.status(401).json({ error : 'User not found'})
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid){
                return res.status(401).json({ error : 'Mot de passe incorrect'})
            }
            res.status(200).json({ 
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id}, 
                    `${process.env.SECRETKEY}`, 
                    { expiresIn: '24h'}
                )
            })
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}; 