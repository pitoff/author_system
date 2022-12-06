import axios from 'axios'
const url = "http://localhost:5000"
const instance = axios.create({
    withCredentials: true,
    // baseURL: API_SERVER
})

export const signup = (userDetails) => instance.post(`${url}/signup`, userDetails)
export const login = (userDetails) => instance.post(`${url}/login`, userDetails)
export const logout = () => instance.get(`${url}/logout`)
export const verifyUser = () => instance.get(`${url}/verifyuser`)

export const books = () => instance.get(`${url}/book/all-books`)
export const myBooks = (user_id) => instance.get(`${url}/book/my/books/${user_id}`)
export const createBook = (bookData) => instance.post(`${url}/book/create`, bookData, {
    'Content-Type': 'multipart/form-data'
})
export const editBook = (bookId) => instance.get(`${url}/book/edit/${bookId}`)
export const updateBook = (bookId, book) => instance.patch(`${url}/book/update/${bookId}`, book)
export const deleteBook = (bookId) => instance.delete(`${url}/book/delete/${bookId}`)
