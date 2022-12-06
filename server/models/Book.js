const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const bookSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    isbn:{
        type:String,
        unique:true,
        required:true
    },
    published_at:{
        type:String,
        required:true
    },
    article:{
        type:String,
        required:true
    }

}, {timestamps: true})

bookSchema.pre('save', function(){
    const date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    const today = `${year}-${month}-${day}`
    if(this.published_at > today)
    {
        throw Error('invalid')
    }
})

bookSchema.plugin(uniqueValidator, { message: 'Book with {PATH} already exists.' })

const Book = mongoose.model('Book', bookSchema)
module.exports = Book