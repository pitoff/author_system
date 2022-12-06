const mongoose = require('mongoose')
const Book = require('../models/Book')
const { join } = require('path')
const { Formidable } = require('formidable')
const bluebird = require('bluebird')
const path = require('path')
const fs = bluebird.promisifyAll(require('fs'))

const alertError = (err) => {
    let errors = {title: '', about: '', isbn: '', published_at: ''}

    // if(err.code === 11000){
    //     errors.isbn = "Isbn is already registered"
    //     return errors
    // }

    if(err.message === 'invalid'){
        errors.published_at = "Published date cannot be a future date"
    }

    if(err.message.includes('Book validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

const checkFolderExist = async(upLoadFolder) => {
    try {
        await fs.statAsync(upLoadFolder)
    } catch (error) {
        if(error && error.code == 'ENOENT'){
            try {
                //makes folder dir
                await fs.mkdirAsync(upLoadFolder, {recursive: true})
            } catch (error) {
                console.log('Error creating folder', error)
                return false
            }
        }else{
            console.log('Error reading the uploads folder')
            return false
        }
    }
    return true
}

const checkFileType = (file) => {
    // type = 'image/png'
    const type = file.mimetype.split('/').pop()
    const validTypes = ['png', 'jpeg', 'jpg', 'pdf']
    if(validTypes.indexOf(type) == -1){
        console.log('The file type is invalid')
        return false
    }
    return true
}

module.exports.create = async(req, res) => {
    // const { user_id, title, about, isbn, published_at, articleFile } = req.body

    const form = new Formidable()
    const imgPath = path.join(__dirname, '../') //move out from controller dir, 1 step back
    const upLoadFolder = join(imgPath, 'public', 'uploads')
    // form.maxFileSize = 50 * 1024 
    form.uploadDir = upLoadFolder
    const folderExists = await checkFolderExist(upLoadFolder)
    if(!folderExists){
        return res.json({ok: false, msg:'Err occured reading upload folder'})
    }
    
    form.parse(req, async(err, fields, files) => {
      if(err){
        console.log('Err parsing files')
        return res.json({ok: false, msg: 'Err parsing the files'})
      }  
      const file = files.articleFile
      const isValid = checkFileType(file)
      const fileName = file.originalFilename
      console.log(file.filepath)
    //   const fileName = encodeURIComponent(file.originalFilename.replace(/&. *;+/g, '-'))
      if(!isValid){
        return res.json({ok: false, msg: 'File type is invalid'})
      }

      try {
        const book = await Book.create({user_id:fields.user_id, title:fields.title, about:fields.about, isbn:fields.isbn, published_at:fields.published_at, article:fileName})
            await fs.renameAsync(file.filepath, join(upLoadFolder, fileName))
            res.status(201).json({data: book})
        
        } catch (error) {
            let errors = alertError(error)
            res.status(400).json({errors})
        }

    })
    
}

module.exports.Books = async(req, res) => {
    try {
        const books = await Book.find().populate('user_id').exec()
        // const books = await Book.aggregate([
        //     {
        //         $lookup:{
        //             from: 'users',
        //             localField: 'user_id',
        //             foreignField: '_id',
        //             as: 'author'
        //         }
        //     }
        // ]);
        // console.log(books);
        res.status(200).json({
            books
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports.myBooks = async(req, res) => {
    try {
        const books = await Book.find({user_id: req.params.id})
        res.status(200).json({
            books
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({'404': 'resource was not found'})
    }

}

module.exports.edit = async(req, res) => {
    const { id } = req.params
    if(!mongoose.isValidObjectId(id)){
        res.status(404).json({'msg': 'the book was not found'})
    }
    try {
        const book = await Book.findById(id)
        res.status(200).json({book})
    } catch (error) {
        console.log(error)
    }
    
}

module.exports.update = async(req, res) => {
    const { id } = req.params
    const { title, about, isbn, published_at } = req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({'msg': 'the book was not found'})
    }

    try {
        const book = {title, about, isbn, published_at, _id:id}
        await Book.findByIdAndUpdate(id, book, {new:true})
        res.status(200).json(book)
    } catch (error) {
        console.log(error)
    }
}

module.exports.delete = async(req, res) => {
    const {id} = req.params
    if(!mongoose.isValidObjectId(id)){
        res.status(404).json(`${id} was not found`)
    }

    try {
        await Book.findByIdAndRemove(id)
        res.status(200).json({'msg' : 'Book deleted successfully'})
    } catch (error) {
        console.log(error)
    }
}