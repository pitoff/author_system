import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom'
import { updateBook, storeBookUpdate } from '../../functions/index'
import { UserContext } from '../../UserContext'

const EditBook = () => {
    const {user} = useContext(UserContext)
    const { book_id } = useParams()
    const [book, setBook] = useState({title:'', about:'', isbn: '', published_at: ''})
    const navigate = useNavigate()
    const checkBookOwner = () => {
        return <Navigate to={'/my/books'}/>
    }

    useEffect(() => {
        const showDetails = async() => {
            await updateBook(book_id).then((res) => 
                    res.data.book.user_id === user._id ? setBook(res.data.book) : checkBookOwner()
                )
            .catch((error) => console.log(error))
        }
        showDetails()
    }, [])

    const bookUpdate = async (e) => {
        e.preventDefault();
        await storeBookUpdate(book_id, book).then((navigate('/my/books'))).catch((error) => console.log(error))
    }
    
    return (
        <div>
            <div className='mt-3'>

                <div className="card text-center">
                    <div className="card-header">
                        <h3 className='mt-2 text-center text-success'><strong>Edit Book</strong></h3>
                    </div>
                    <div className="card-body">

                        <div className='text-start mb-2'>
                            Update book details
                        </div>

                        <form onSubmit={bookUpdate}>
                            <div className="row">
                                <div className="col-sm-6 offset-3">
                                    <div className="mb-3">
                                        <label className="form-label">Title<span className='text-danger'>*</span></label>
                                        <input type="text" className="form-control" placeholder="Archive taste of love"
                                        value={book.title} onChange={(e) => setBook({...book, title:e.target.value})}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Brief description<span className='text-danger'>*</span></label>
                                        <textarea className="form-control" rows="3"  value={book.about} onChange={(e) => setBook({...book, about:e.target.value})}>
                                        </textarea>

                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Isbn<span className='text-danger'>*</span></label>
                                        <input type="text" className="form-control" placeholder="124-T76U1"
                                            value={book.isbn} onChange={(e) => setBook({...book, isbn:e.target.value})}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Published Date<span className='text-danger'>*</span></label>
                                        <input type="date" className="form-control" placeholder="04/09/2022"
                                            value={book.published_at} onChange={(e) => setBook({...book, published_at:e.target.value})}
                                        />
                                    </div>
                                    {/* <div className="mb-3">
                                    <label className="form-label">Article<span className='text-danger'>*</span></label>
                                    <input type="file" className="form-control"/>
                                </div> */}
                                    <div className="mb-3">
                                        <Link to='/my/books'><button className='btn btn-warning mx-1'>Back</button></Link>
                                        <button className='btn btn-success'>Save</button>
                                    </div>

                                </div>
                            </div>
                        </form>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default EditBook