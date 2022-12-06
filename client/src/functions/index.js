import * as api from '../api/index'

export const createUser = async(userDetails) => {
    const res = await api.signup(userDetails)
    return res
}

export const loginUser = async(userDetails) => {
    const res = await api.login(userDetails)
    return res
}

export const logoutUser = async() => {
    const res = await api.logout()
    return res
}

export const checkUser = async() => {
    const res = await api.verifyUser()
    return res
}

export const allBooks = async() => {
    const res = await api.books()
    return res
}

export const storeBook = async(bookData) => {
    const res = await api.createBook(bookData)
    return res
}

export const viewMyBooks = async(user_id) => {
    const res = await api.myBooks(user_id)
    return res
}

export const updateBook = async(book_id) => {
    const res = await api.editBook(book_id)
    return res
}

export const deleteBook = async(book_id) => {
    const res = await api.deleteBook(book_id)
    return res
}

export const storeBookUpdate = async(book_id, book) => {
    const res = await api.updateBook(book_id, book)
    return res
}