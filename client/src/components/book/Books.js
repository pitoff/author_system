import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../UserContext'
import { allBooks, deleteBook } from '../../functions/index'
import { Link } from 'react-router-dom'
import './Book.css'

const Books = () => {
    const { user } = useContext(UserContext)
    const [books, setBooks] = useState('')
    const [book, setBook] = useState('')
    useEffect(() => {
        const showBooks = async () => {
            await allBooks().then((res) => setBooks(res.data.books))
                .catch((error) => console.log(error))
        }
        showBooks()
    }, [books])

    const removeBook = async(id) => {
        await deleteBook(id).then(() => setBook(''), handleCloseModal()).catch((error) => console.log(error))
    }

    const handleCloseModal = () => {            
        document.getElementById("exampleModal").classList.remove("show", "d-block");
        document.querySelectorAll(".modal-backdrop")
        .forEach(el => el.classList.remove("modal-backdrop"));
    }

    return (
        <div>
            <div className='mt-3'>

                <div className="card text-center">
                    <div className="card-header">
                        <h3 className='mt-2 text-center'>List of Books</h3>
                    </div>
                    <div className="card-body">

                        <div className='text-end mb-2'>
                            Click <Link to={`/create/book`}> <i>Here</i> </Link> to create book.
                        </div>

                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card">
                                    <div className="card-body">

                                        <div className='table table-responsive'>
                                            <table class="table text-start table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Title</th>
                                                        <th scope="col">Author</th>
                                                        <th scope="col">About</th>
                                                        <th scope="col">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {books.length > 0 ? books.map((book, num) => (
                                                        <tr key={book._id}>
                                                            <td>{num + 1}</td>
                                                            <td>{book.title}</td>
                                                            <td>{book.user_id.firstname + ' ' + book.user_id.lastname}</td>
                                                            <td className='about'>{book.about}</td>
                                                            {
                                                                user._id === book.user_id._id ?
                                                                    <td>
                                                                        <button className='btn btn-success btn-sm'>View</button>
                                                                        <Link to={`/edit/${book._id}`} className='btn btn-primary btn-sm mx-1'> Edit </Link>
                                                                        <button type="button" className='btn btn-danger btn-sm' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e) => setBook(book)}>Remove</button>
                                                                    </td>
                                                                    : <td>
                                                                        <button className='btn btn-success btn-sm'>View</button>
                                                                    </td>
                                                            }

                                                        </tr>
                                                    )) : (
                                                        <tr>
                                                            <td colSpan={5}>
                                                                <div className='alert alert-warning text-center'>{'No book was found'}</div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* <button type="button" class="btn btn-primary" >
                                            Launch demo modal
                                        </button> */}

                                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Remove Book</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        Are you sure you want to delete {book.title} ?
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" className="btn btn-primary" onClick={() => removeBook(book._id)}>Save changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Books