import React, { useState, useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { loginUser } from '../../functions/index'
import { UserContext } from '../../UserContext'

const Login = () => {
    const {user, setUser} = useContext(UserContext)
    const [userDetails, setUserDetails] = useState({email: '', pwd: ''})
    const [userErr, setUserErr] = useState({loginErr:'', emailErr:'', pwdErr:''})

    const submitLogin = async(e) => {
        e.preventDefault();
        // console.log(user)
        setUserErr({...userErr, loginErr:'', emailErr:'', pwdErr:''})
        if(userDetails.email === ''){
            userErr.emailErr = 'Please enter email'
        }
        if(userDetails.pwd === ''){
            userErr.pwdErr = 'Please enter password'
        }

        if(userDetails.email !== null && userDetails.pwd !== null){
            await loginUser(userDetails)
            .then((res) => { setUser(res.data.user) })
            .catch((error) => setUserErr({...userErr, 
                loginErr:error.response.data.errors.loginErr
            }))
    
            setUserDetails({...userDetails, email:'', pwd:''})
        }

        // const origin = location.state?.from?.pathname || '/dashboard';
        // navigate(origin);
        
    }

    if(user){
        return <Navigate to='/dashboard'/>
    }

    return (
        <div>
            <div className='mt-3'>

                <div className="card text-center">
                    <div className="card-header">
                        <h3 className='mt-2 text-center text-success'><strong>User Login</strong></h3>
                    </div>
                    <div className="card-body">

                        {userErr.loginErr ? (
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                {userErr.loginErr}
                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        ) : ''}

                        
                        <form onSubmit={submitLogin}>
                        <div className="row">
                            <div className="col-sm-6 offset-3">
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" placeholder="Billy@gmail.com" 
                                        value={userDetails.email} onChange={(e) => setUserDetails({...userDetails, email:e.target.value})}
                                    />
                                    <span className='text-danger'><i>{userErr.emailErr}</i></span>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" className="form-control" 
                                        value={userDetails.pwd} onChange={(e) => setUserDetails({...userDetails, pwd:e.target.value})}
                                    />
                                    <span className='text-danger'><i>{userErr.pwdErr}</i></span>
                                </div>
                                <div className="mb-3">
                                    <button className='btn btn-success' type='submit'>Login</button>
                                </div>

                                <div className="mb-3">
                                    No account? <Link to={`/signup`}>Signup</Link>
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

export default Login