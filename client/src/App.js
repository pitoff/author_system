import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { UserContext } from './UserContext'
import React, { useState, useEffect } from 'react'
import Navbar from './components/layouts/Navbar'
import ProtectedRoutes from './components/layouts/ProtectedRoutes'
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import Home from "./components/home/Home"
import CreateBook from "./components/book/CreateBook"
import { checkUser } from './functions/index'
import Dashboard from './components/dashboard/Dashboard'
import MyBooks from './components/book/MyBooks'
import Books from './components/book/Books'
import EditBook from './components/book/EditBook'

function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const userVerify = async() => {
      await checkUser().then((res) => {
        // console.log(res.data)
        setUser(res.data)
      })
      .catch((error) => console.log(error))
    }
    userVerify()
  }, [])

  return (
    <Router>
    <div className="App container shadow p-3 mb-5 bg-body rounded">
        <UserContext.Provider value={{user, setUser}}>
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/dashboard" element={
              <ProtectedRoutes> <Dashboard/> </ProtectedRoutes>
            } />
            <Route path="/create/book" element={
              <ProtectedRoutes> <CreateBook/> </ProtectedRoutes>
            } />
            <Route path="/my/books" element={
              <ProtectedRoutes> <MyBooks/> </ProtectedRoutes>
            } />
            <Route path="/all-books" element={
              <ProtectedRoutes> <Books/> </ProtectedRoutes>
            } />
            <Route path="/edit/:book_id" element={
              <ProtectedRoutes> <EditBook/> </ProtectedRoutes>
            } />
          </Routes>
        </UserContext.Provider>
    </div>
    </Router>
  );
}

export default App;
