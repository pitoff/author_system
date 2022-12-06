import React from 'react'
import Author from './Author'

const Authors = () => {
    const authors = [
        {
            id:1,
            name: "Billy joe",
            email: "billjoe@yahoo.com",
            status: 1
        },
        {
            id:2,
            name: "Cersie jane",
            email: "cersiejane@gmail.com",
            status: 1
        },
        {
            id:3,
            name: "jullie homes",
            email: "julliehomes@hotmail.com",
            status: 0
        },
        {
            id:4,
            name: "jullie homes",
            email: "julliehomes@hotmail.com",
            status: 0
        }

    ]

    return (
        <div className='table table-responsive'>
            <table class="table text-start table-bordered">
              <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Mail</th>
                    <th scope="col">Books</th>
                </tr>
            </thead>
            <tbody>
            {authors && authors.map((author) =>(
                <tr key={author.id}>
                     <Author author={author}/>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

    )
}

export default Authors