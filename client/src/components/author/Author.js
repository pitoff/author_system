import React from 'react'

const Author = ({author: {id, name, email, status}}) => {
    return (
        <>
            <td></td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{status}</td>
        </>
    )
}

export default Author