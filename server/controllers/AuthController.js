const mongoose = require('mongoose')
const User = require('../models/User')
const jwt = require('jsonwebtoken');
const maxAge = 24 * 60 * 60;
const createJwt = id => {
    return jwt.sign({id}, 'user token', {
        expiresIn:maxAge
    })
}

const alertErrors = (err) => {
    console.log(err)
    let errors = {firstname: '', lastname: '', email:'', pwd:'', loginErr:''}

    //check if login error occurs
    if(err.message === 'invalid'){
        errors.loginErr = 'You have incorrect credentials'
        return errors
    }

    //check if email exists, we use the code of 11000 because it checks for duplicate
    if(err.code === 11000){
        errors.email = "Email is already registered"
        return errors
    }

    //check if the error message has user validation failed
    if(err.message.includes('User validation failed')){
        // console.log()
        //errors return the main errors for that validation and use object destructuring to get the properties
        Object.values(err.errors).forEach(({properties}) => {
            // console.log(properties)
            //takes error property key of path, assign it to errors destructured variable and pass the message
            errors[properties.path] = properties.message
        })
    }
    return errors
    
}

module.exports.signup = async(req, res) => {
    const { firstname, lastname, email, pwd } = req.body
    try {
        const user = await User.create({ firstname, lastname, email, pwd })
        const token = createJwt(user._id)
        res.cookie('jwt', token, {httpOnly:true, maxAge: maxAge * 1000})
        res.status(201).json({
            'user': user
        })
    } catch (error) {
        // console.log(error)
        let errors = alertErrors(error)
        res.status(400).json({errors})
    }
}

module.exports.login = async(req, res) => {
    const { email, pwd } = req.body
    try {
        const user = await User.login(email, pwd)
        const token = createJwt(user._id)
        // console.log(token)
        res.cookie('jwt', token, {httpOnly:true, maxAge: maxAge * 1000})
        res.status(201).json({
            "user" : user
        })
    } catch (error) {
        // console.log(error)
        let errors = alertErrors(error)
        res.status(400).json({errors})
    }

}

module.exports.verifyUser = (req, res, next) => {
    const token = req.cookies.jwt
    // console.log('hit')
    if(token){
        jwt.verify(token, 'user token', async(err, decodedToken) => {
            console.log('the decoded token is', decodedToken)
            if(err){
                console.log(err.message)
            }else{
                let user = await User.findById(decodedToken.id)
                res.json(user)
                next()
            }
        })
    }else{
        next()
    }
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1})
    res.status(200).json({logout:true})
}