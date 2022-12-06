import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../UserContext'
import { viewMyBooks, deleteBook } from '../../functions/index'

const MyBooks = () => {
    const { user } = useContext(UserContext)
    const [books, setBooks] = useState('')
    const [book, setBook] = useState('')

    useEffect(() => {
        const books = async () => {
            await viewMyBooks(user._id)
                .then((res) => {
                    setBooks(res.data.books)
                    // setBooks(res.data.books.filter(book => book.user_id === user._id))
                })
                .catch((error) => console.log(error))
        }
        books()
    }, [books])

    const removeBook = async(id) => {
        await deleteBook(id).then(setBook(''), handleCloseModal()).catch((error) => console.log(error))
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
                        <h3 className='mt-2 text-center'>My Books</h3>
                    </div>
                    <div className="card-body">

                        <div className='text-end mb-2'>
                            Click <Link to={`/create/book`}> <i>Here</i> </Link> to create book.
                        </div>

                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h3 className="card-title">List of Books I have created</h3>
                                        <div className='table table-responsive'>
                                            <table class="table text-start table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Title</th>
                                                        <th scope="col">About</th>
                                                        <th scope='col'>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {books.length > 0 ? books.map((book, key) => (
                                                        <tr key={book._id}>
                                                            <td>{key + 1}</td>
                                                            <td>{book.title}</td>
                                                            <td>{book.about}</td>
                                                            <td>
                                                                <button className='btn btn-success btn-sm'>View</button>
                                                                <Link to={`/edit/${book._id}`} className='btn btn-primary btn-sm mx-1'> Edit </Link>
                                                                <button type="button" className='btn btn-danger btn-sm' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setBook(book)}>Remove</button>
                                                            </td>
                                                        </tr>
                                                    )) : (
                                                        <tr>
                                                            <td colSpan={4}>
                                                                <div className='alert alert-warning text-center'>{'You have not created any book!'}</div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>

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
                    <div className="card-footer text-muted">
                        <Link to={`/all-books`}>View all books</Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MyBooks