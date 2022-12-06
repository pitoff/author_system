import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import { UserContext } from '../../UserContext'

const Home = () => {
    const {user} = useContext(UserContext)

    return (
        <div>

            <div className='mt-3'>

                <div className="card text-center">
                    <div className="card-header">
                        <h3 className='mt-2 text-center'>{user ? user.firstname : ''} Welcome to Books && Authors</h3>
                    </div>
                    <div className="card-body">

                        <div className='text-end mb-2'>
                            Click <Link to={`/create/book`}> <i>Here</i> </Link> to create book.
                        </div>

                        <div className="row">
                            <div className="col-sm-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Our Authors</h5>
                                        
                                        <a href="#" className="btn btn-primary">View more</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Recent Books</h5>
                                        
                                        <a href="#" className="btn btn-primary">View more</a>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="card-footer text-muted">
                        2 days ago
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Home