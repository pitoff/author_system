import React, {useContext} from 'react'
import { UserContext } from '../../UserContext'
import { logoutUser } from '../../functions/index'
import SignedInMenu from './SignedInMenu'
import SignedOutMenu from './SignedOutMenu'

const Navbar = () => {

  const {user, setUser} = useContext(UserContext)
  const logout = async() => {
    await logoutUser().then((res) => console.log(res)).catch((error) => console.log(error))
    setUser(null)
  }

  const menu = user ? <SignedInMenu logout={logout}/> : <SignedOutMenu/>

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/"><strong>Authors</strong></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        {menu}
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar