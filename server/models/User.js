const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true, "Please enter your firstname"]
    },
    lastname:{
        type:String,
        required:[true, "Please enter your lastname"]
    },
    email:{
        type:String,
        unique:true,
        required:[true, "enter mail address"],
        lowercase:true,
        validate: [isEmail, "email is invalid"]
    },
    pwd:{
        type:String,
        required:[true, "enter password"],
        minlength: [3, "Password should exceed 3 xters"]
    }

}, {timestamps:true})

//perform action b4 save to db
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.pwd = await bcrypt.hash(this.pwd, salt)
    next()
})

userSchema.statics.login = async function (email, pwd){
    const user = await this.findOne({email})
    if(user){
        const isAuth = await bcrypt.compare(pwd, user.pwd)
        if(isAuth){
            return user
        }else{
            throw Error('invalid')
        }
    }else{
        throw Error('invalid')
    }
}

const User = mongoose.model('User', userSchema)
module.exports = User