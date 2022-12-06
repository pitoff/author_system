import React, {useState, useContext, useEffect} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../../UserContext'
import { storeBook } from '../../functions/index'

const CreateBook = () => {
    const {user} = useContext(UserContext)
    const [book, setBook] = useState({user_id:user._id, title:'', about:'', isbn: '', published_at: '', articleFile: '', articleFileName: ''})
    const [bookErr, setBookErr] = useState(false)
    const [emptyFieldsErr, setEmptyFieldsErr] = useState(false)
    const [selectedFile, setSelectedFile] = useState()
    const [isSelected, setIsSelected] = useState(false)
    const navigate = useNavigate()

    // const changeHandler = (e) => {
    //     console.log(e.target.files[0])
    //     setSelectedFile(e.target.files[0])
    //     setIsSelected(true)
    // }
    
    const submitBook = async(e) => {
        e.preventDefault()
        if(book.title === '' || book.about === '' || book.isbn === '' || book.published_at === '' || book.articleFile === ''){
            setEmptyFieldsErr(true)
        }else{
            try {
                // console.log(book)
                const data = new FormData()
                data.append('articleFile', book.articleFile)
                data.append('user_id', user._id)
                data.append('isbn', book.isbn)
                data.append('title', book.title)
                data.append('about', book.about)
                data.append('published_at', book.published_at)
                
                await storeBook(data)
                return navigate('/my/books')
            } catch (error) {
                // console.log(error.response.data.errors)
                setBookErr({...bookErr, isbnErr:error.response.data.errors.isbn, published_atErr:error.response.data.errors.published_at})
            }
        }
   
    }
   
    return (
        <div>
            <div className='mt-3'>

                <div className="card text-center">
                    <div className="card-header">
                        <h3 className='mt-2 text-center text-success'><strong>Create Book</strong></h3>
                    </div>
                    <div className="card-body">

                        <div className='text-start mb-2'>
                            Enter book details
                        </div>
                            {emptyFieldsErr ? (
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    {'Please fill all required * fields'}
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            ) : ''}

                        <form onSubmit={submitBook} encType="multipart/form-data">
                        <div className="row">
                            <div className="col-sm-6 offset-3">
                                <div className="mb-3">
                                    <label className="form-label">Title<span className='text-danger'>*</span></label>
                                    <input type="text" className="form-control" placeholder="Archive taste of love" 
                                    value={book.title} onChange={(e) => setBook({...book, title:e.target.value})}
                                    />
                                    {/* <span className='text-danger'>{bookErr.titleErr}</span> */}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Brief description<span className='text-danger'>*</span></label>
                                    <textarea className="form-control" rows="3" value={book.about} onChange={(e) => setBook({...book, about:e.target.value})} >
                                    </textarea>
                                    {/* <span className='text-danger'>{bookErr.aboutErr}</span> */}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Isbn<span className='text-danger'>*</span></label>
                                    <input type="text" className="form-control" placeholder="124-T76U1" 
                                    value={book.isbn} onChange={(e) => setBook({...book, isbn:e.target.value})}
                                    />
                                    <span className='text-danger'>{bookErr.isbnErr}</span>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Published Date<span className='text-danger'>*</span></label>
                                    <input type="date" className="form-control" placeholder="04/09/2022" 
                                    value={book.published_at} onChange={(e) => setBook({...book, published_at:e.target.value})}
                                    />
                                    <span className='text-danger'>{bookErr.published_atErr}</span>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Article<span className='text-danger'>*</span></label>
                                    <input type="file" name="file" onChange={(e) => setBook({...book, articleFile:e.target.files[0], articleFileName:e.target.files[0].name})} className="form-control"/>
                                    {/* {isSelected ? (<div><p>Filename: {selectedFile.name}</p></div>) : (<p>Please select a file</p>)} */}
                                </div>
                                <div className="mb-3">
                                    <button className='btn btn-success'>Save</button>
                                </div>

                            </div>
                        </div>
                        </form>

                    </div>
                    <div className="card-footer text-muted">
                        Click <Link to={`/my/books`}> Here </Link> to View my books
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CreateBook