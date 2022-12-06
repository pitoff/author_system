import React, { useState, useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { createUser } from '../../functions/index'
import { UserContext } from '../../UserContext'

const Signup = () => {

  const { user, setUser } = useContext(UserContext)
  const [userDetails, setUserDetails] = useState({firstname: '', lastname: '', email: '', pwd: '', confirmPwd: ''})
  const [userErr, setUserErr] = useState({firstnameErr: '', lastnameErr: '', emailErr: '', pwdErr: '', confirmPwdErr: ''})

  const submitUser = async(e) => {
    e.preventDefault();
    setUserErr({...userErr, firstnameErr: '', lastnameErr: '', emailErr: '', pwdErr: '', confirmPwdErr: ''})

    await createUser(userDetails).then((res) =>
    // {console.log(res.data.user)} 
      setUser(res.data.user))
    .catch((error) => setUserErr({...userErr, 
      firstnameErr:error.response.data.errors.firstname,
      lastnameErr:error.response.data.errors.lastname,
      emailErr:error.response.data.errors.email,
      pwdErr:error.response.data.errors.pwd,
      confirmPwdErr:userDetails.pwd !== userDetails.confirmPwd ? 'Password does not match' : ''
    }))

    setUserDetails({...userDetails, firstname:'', lastname:'', email:'', pwd:'', confirmPwd:''})
  
  }

  if(user){
    return <Navigate to='/login'/>  
  }

  return (
    <div>
      <div className='mt-3'>

        <div className="card text-center">
          <div className="card-header">
            <h3 className='mt-2 text-center text-success'><strong>Sign up</strong></h3>
          </div>
          <div className="card-body">

              <form onSubmit={submitUser}>
              <div className="col-sm-6 offset-3">
                <div className="mb-3">
                  <label className="form-label">Firstname</label>
                  <input type="text" className="form-control" 
                  placeholder="Bill" value={userDetails.firstname} onChange={(e) => setUserDetails({...userDetails, firstname:e.target.value})}
                  />
                  <span className="text-danger">{userErr.firstnameErr}</span>
                </div>
                <div className="mb-3">
                  <label className="form-label">Lastname</label>
                  <input type="text" className="form-control"
                    placeholder="James" value={userDetails.lastname} onChange={(e) => setUserDetails({...userDetails, lastname:e.target.value})}
                  />
                  <span className="text-danger">{userErr.lastnameErr}</span>
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control"
                    placeholder="Billy@gmail.com" value={userDetails.email} onChange={(e) => setUserDetails({...userDetails, email:e.target.value})}
                  />
                  <span className="text-danger">{userErr.emailErr}</span>
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control"
                    value={userDetails.pwd} onChange={(e) => setUserDetails({...userDetails, pwd:e.target.value})}
                  />
                  <span className="text-danger">{userErr.pwdErr}</span>
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm password</label>
                  <input type="password" className="form-control"
                    value={userDetails.confirmPwd} onChange={(e) => setUserDetails({...userDetails, confirmPwd:e.target.value})}
                  />
                  <span className="text-danger">{userErr.confirmPwdErr}</span>
                </div>
                <div className="mb-3">
                  <button className='btn btn-success' type='submit'>Create</button>
                </div>

                <div className="mb-3">
                  Already have account? <Link to={`/login`}>Login</Link>
                </div>

            </div>
            </form>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Signup