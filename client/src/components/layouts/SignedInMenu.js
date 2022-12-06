import React from 'react'
import { Link } from 'react-router-dom'

const SignedInMenu = ({logout}) => {
    return (
        <>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                    <Link className="nav-link" to="#">Profile</Link>
                </li>
                <li className="nav-item">
                    {/* <a className="nav-link active" aria-current="page" href="#">Create book</a> */}
                    <Link className="nav-link" to={'/create/book'}>Create Book</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={'/all-books'}>Books</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={'/my/books'}>My Books</Link>
                </li>
            </ul>
            <span className="navbar-text">
                <li className="nav-item" onClick={logout}>
                    <a className="" href="#">Logout</a>
                </li>
            </span>
        </>
    )
}

export default SignedInMenu