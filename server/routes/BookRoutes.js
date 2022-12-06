const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const book = require('../controllers/BookController')

router.get('/all-books', book.Books)
router.get('/my/books/:id', book.myBooks)
router.get('/edit/:id', book.edit)
router.post('/create', book.create)
router.patch('/update/:id', book.update)
router.delete('/delete/:id', book.delete)

module.exports = router